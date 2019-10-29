import DefaultBaseService from './base/impl/default'
import Query from '../lib/smart-criteria/query'
import {injectable} from 'inversify'
import PeekableRecordManager from '../repositories/base/peekable-record-manager'
import {
  listener,
  onEvent,
  postEmit
} from '../annotations/event'
import RabbitCredentialModel from '../models/rabbit-credential'
import {Stomp} from '@stomp/stompjs/lib/stomp.js'
import {EVENTS} from '../configs/dicts'
import {lazy} from '../annotations/inversify'
import {LocalSettingsService} from './local-settings'
import {ProfileService} from './profile'
import SockJS from 'sockjs-client/lib/entry.js'

@injectable()
@listener('RabbitCredential')
export class RabbitCredentialService
  extends DefaultBaseService<RabbitCredentialModel, PeekableRecordManager<RabbitCredentialModel, Query>> {

  private static buildConnectionHeaders(credentials: RabbitCredentialModel) {
    return {
      login: credentials.username,
      passcode: credentials.password,
      host: credentials.virtualHost
    }
  }

  private static buildUrl(credentials: RabbitCredentialModel) {
    return `${credentials.protocol}://${credentials.host}:${credentials.port}/stomp`
  }

  @lazy('LocalSettingsService')
  private localSettingsService: LocalSettingsService

  @lazy('ProfileService')
  private profileService: ProfileService

  private client
  private credentials: RabbitCredentialModel
  private onReadyQueue: Array<(service: RabbitCredentialService) => void>

  onReady(fn) {
    console.log('ONREADY')
    if (!this.onReadyQueue) {
      this.onReadyQueue = []
    }
    this.onReadyQueue.push(fn)
  }

  preload() {
    return this.prepareConnection()
  }

  async subscribe(destination: string, callback?: (message: { body: string }) => any): Promise<{ unsubscribe() }> {
    if (!this.client) {
      throw new Error('not ready')
    }
    const path = await this.getSubscriptionPath()
    return this.client.subscribe(`/exchange/${this.credentials.exchange}/${path}.${destination}`, callback)
  }

  @onEvent(EVENTS.rabbitConnectionEstablished)
  protected flushOnReadyQueue() {
    if (!this.onReadyQueue) {
      this.onReadyQueue = []
    }
    this.onReadyQueue.forEach(it => it(this))
    this.onReadyQueue = []
  }

  private async prepareConnection() {
    try {
      this.credentials = await this.getCredentials()
      if (!this.credentials) {
        return
      }

      const url = RabbitCredentialService.buildUrl(this.credentials)

      const ws = new SockJS(url)

      const client = Stomp.over(ws)

      const connectionHeaders = RabbitCredentialService.buildConnectionHeaders(this.credentials)

      client.heartbeat.incoming = 0
      client.reconnect_delay = 0

      client.connect(connectionHeaders, () => this.saveClient(client), () => this.prepareConnection())
      // console.log(client, ws, 'CONNECT')
    } catch (error) {
      console.log(error)
    }
  }

  @postEmit(EVENTS.rabbitConnectionEstablished)
  private saveClient(client) {
    this.client = client
  }

  private async getSubscriptionPath() {
    const session = await this.localSettingsService.getSession()
    const activeProfileId = await this.profileService.getActiveProfileId()
    return `${session}.${activeProfileId}`
  }

  private async getCredentials(): Promise<RabbitCredentialModel> {
    const credentials = await this.getRepo()
                                  .findByPrimary('')

    if (!credentials) {
      throw new Error('no credentials')
    }

    return credentials
  }

}

const rabbitCredentialService = new RabbitCredentialService(RabbitCredentialModel)

export default rabbitCredentialService

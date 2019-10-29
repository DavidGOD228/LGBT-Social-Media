import DefaultBaseService from './base/impl/default'
import Query from '../lib/smart-criteria/query'
import PeekableRecordManager from '../repositories/base/peekable-record-manager'
import {LogoutClearable} from './mixins/logout-clearable'
import {mixin} from '../annotations/common'
import {
  listener,
  onEvent
} from '../annotations/event'
import NotificationModel from '../models/notification'
import {ProfileService} from './profile'
import {lazy} from '../annotations/inversify'
import Restrictions from '../lib/smart-criteria/restrictions'
import {injectable} from 'inversify'
import MediaRequestModel from '../models/media-request'
import {MediaRequestService} from './media-request'
import ProfileInteractionModel from '../models/base/profile-interaction'
import {EVENTS} from '../configs/dicts'
import Fetch from '../utils/fetch'
import configuration from '../configs/index'
import {LocalSettingsService} from './local-settings'
import {AccountService} from './account'
import firebase from '../utils/firebase'
import Time from '../models/time'
import moment from 'moment'
import {RabbitCredentialService} from './rabbit-credential'
import eventEmitter from '../utils/event-emitter'
import {Alert} from "react-native";

const strategyMap = {
  MESSAGE: (notification: NotificationModel, _) => ({
    author: notification.notificationContent.parsedContent.chatMember.profileId,
    action: 'sent you a message'
  }),

  MEDIA_REQUEST: async (notification: NotificationModel, me) => {
    const message = notification.notificationContent.parsedContent as MediaRequestModel
    return {
      author: message.sourceProfileId === me ? message.targetProfileId : message.sourceProfileId,
      action: '',
      mediaRequestId: message.id
    }
  },

  PROFILE_WAS_VIEWED: (notification: NotificationModel, me) => {
    const parsed = notification.notificationContent.parsedContent as ProfileInteractionModel
    return {
      author: parsed.sourceProfileId === me ? parsed.targetProfileId : parsed.sourceProfileId,
      action: 'looked at your profile'
    }
  },

  PROFILE_WAS_FAVORITE: (notification: NotificationModel, me) => {
    const parsed = notification.notificationContent.parsedContent as ProfileInteractionModel
    return {
      author: parsed.sourceProfileId === me ? parsed.targetProfileId : parsed.sourceProfileId,
      action: 'favorited you'
    }
  },

  PROFILE_WAS_FLEXED: (notification: NotificationModel, me) => {
    const parsed = notification.notificationContent.parsedContent as ProfileInteractionModel
    return {
      author: parsed.sourceProfileId === me ? parsed.targetProfileId : parsed.sourceProfileId,
      action: 'sent you a flex'
    }
  },

  PERMISSION: (notification: NotificationModel, _) => ({
    author: notification.notificationContent.parsedContent.chatMember.profileId,
    action: 'sent you a message'
  })
}

const SUPPORTED_TYPES = Object.keys(strategyMap)

const notificationConverter = (notification: NotificationModel, me: number) =>
  strategyMap[notification.type](notification, me)

interface NotificationSettingsDto {
  enabled: boolean,
  from?: string,
  to: string,
  quietHoursEnabled: boolean,
  sound: boolean
}

@injectable()
@listener('Notification')
@mixin([LogoutClearable])
export class NotificationService
  extends DefaultBaseService<NotificationModel, PeekableRecordManager<NotificationModel, Query>> {

  @lazy('ProfileService')
  private profileService: ProfileService

  @lazy('MediaRequestService')
  private mediaRequestService: MediaRequestService

  @lazy('LocalSettingsService')
  private localSettingsService: LocalSettingsService

  @lazy('AccountService')
  private accountService: AccountService

  @lazy('RabbitCredentialService')
  private rabbitCredentialService: RabbitCredentialService

  getAll() {
    const activeProfileId = this.profileService.getActiveProfileId()

    const query = new Query()
    query.add(Restrictions.equal('profileId', activeProfileId))
         .add(Restrictions.notEqual('status', 'ARCHIVED'))
         .add(Restrictions.equal('hidden', false))
         .add(Restrictions.contain('type', SUPPORTED_TYPES))
         .setSort(Restrictions.desc('id'))

    return this.getRepo()
               .find(query)
  }

  getUnreadForCurrentProfile(): Promise<NotificationModel[]> {
    const activeProfileId = this.profileService.getActiveProfileId()
    return this.getUnreadForProfile(activeProfileId)
  }

  getUnreadForProfile(profileId): Promise<NotificationModel[]> {
    const query = new Query()
    query.add(Restrictions.equal('profileId', profileId))
         .add(Restrictions.equal('status', 'UNREAD'))
         .add(Restrictions.equal('hidden', false))
         .add(Restrictions.contain('type', SUPPORTED_TYPES))

    return this.getRepo()
               .find(query)
  }

  async getForNotificationScene() {

    const activeProfileId = this.profileService.getActiveProfileId()

    const notifications = await this.getAll()
    return Promise.all(notifications.map(async it => {
      const {author, action, ...rest} = await notificationConverter(it, activeProfileId)
      let newAction
      const profile = await this.profileService.getByPrimary(author)
      if (!profile) {
        throw new Error('no profile')
      }

      // todo: refactor this
      if (rest['mediaRequestId']) {
        const mediaRequest = await this.mediaRequestService.getByPrimary(rest['mediaRequestId'])
        if (mediaRequest) {
          if (mediaRequest.status === 'APPROVED') {
            rest['state'] = 'approved'
          }
          if (mediaRequest.status === 'REJECTED') {
            rest['state'] = 'denied'
          }
          if (mediaRequest.type === 'OUTBOUND') {
            if (mediaRequest.status === 'APPROVED') {
              if (activeProfileId === mediaRequest.targetProfileId) {
                newAction = 'You approved access to your photos'
              } else {
                newAction = 'approved access to his photos'
              }
            } else if (mediaRequest.status === 'REJECTED') {
              if (activeProfileId === mediaRequest.targetProfileId) {
                newAction = 'You rejected access to your photos'
              } else {
                newAction = 'rejected access to his photos'
              }
            } else {
              if (activeProfileId === mediaRequest.targetProfileId) {
                newAction = 'requested access to your photos'
              } else {
                newAction = 'You requested access to his photos'
              }
            }
          } else {
            if (mediaRequest.status === 'APPROVED') {
              if (activeProfileId === mediaRequest.targetProfileId) {
                newAction = 'shared access to his photos'
              } else {
                newAction = 'approved access to your photos'
              }
            } else if (mediaRequest.status === 'REJECTED') {
              if (activeProfileId === mediaRequest.targetProfileId) {
                newAction = 'You rejected access to his photos'
              } else {
                newAction = 'rejected access to your photos'
              }
            } else {
              if (activeProfileId === mediaRequest.targetProfileId) {
                newAction = 'shared access to his photos'
              } else {
                newAction = 'You shared access to your photos'
              }
            }
          }
        }
      }

      return {
        ...rest,
        type: it.type,
        userPicture: profile.avatar,
        nickName: profile.nickname,
        author: profile,
        action: newAction || action,
        id: it.id
      }
    }))
  }

  markAllReadForProfile() {
    Fetch.post(configuration.remoteApi.base + '/notifications/mark-read',
      {profileId: this.profileService.getActiveProfileId()})
  }

  async preload() {
    const isLoggedIn = await this.accountService.isLogged()
    if (isLoggedIn) {
      const deviceId = await this.localSettingsService.getValue('DEVICEID')
      firebase.messaging()
              .getToken()
              .then(token => {
                Alert.alert(
                  'Hi there,',
                  token,
                  [
                    {
                      text: 'ОК',
                      onPress: () => console.log('Change date'),
                      style: 'cancel',
                    },
                  ],
                );
                this.updateToken(token, deviceId);
              })

      firebase.messaging()
              .onTokenRefresh(token => this.updateToken(token, deviceId))

      firebase.messaging()
              .onMessage((message) => {
                console.log('FCM MESSAGE', message)
              })

      this.subscribeToNotifications()
    }

    await this.loadNotificationSettings()

    return Promise.resolve()
  }

  @onEvent(EVENTS.login)
  @onEvent(EVENTS.newAccount)
  subscribeToNotifications() {
    this.rabbitCredentialService.onReady(
      service => service.subscribe('NEW_NOTIFICATION', this.emitNotificationEvent)
    )
  }

  emitNotificationEvent() {
    eventEmitter.emit(EVENTS.rabbitNewNotification, null)
  }

  async saveNotificationSettings() {
    const enabled = await this.localSettingsService.isAlertsNotificationsTurnedOn()
    const sound = await this.localSettingsService.isAlertsSoundTurnedOn()
    const quietHoursEnabled = await this.localSettingsService.isQuietHoursTurnedOn()

    const fromTime = JSON.parse(await this.localSettingsService.getQuietHoursStart())
    const toTime = JSON.parse(await this.localSettingsService.getQuietHoursEnd())

    const fromDate = new Date()
    fromDate.setHours(fromTime.hours)
    fromDate.setMinutes(fromTime.minutes)

    const toDate = new Date()
    toDate.setHours(toTime.hours)
    toDate.setMinutes(toTime.minutes)

    const offset = new Date().getTimezoneOffset() * 60 * 1000 // minutes to ms

    const fromUtc = new Date(+fromDate + offset)
    const toUtc = new Date(+toDate + offset)

    const settingsDto = {
      from: moment(fromUtc)
        .format('HH:mm'),
      to: moment(toUtc)
        .format('HH:mm'),
      enabled,
      sound,
      quietHoursEnabled
    }

    Fetch.post(configuration.remoteApi.base + '/notifications/settings', settingsDto)
  }

  async loadNotificationSettings() {
    const settings: NotificationSettingsDto = (await Fetch.get(
      configuration.remoteApi.base + '/notifications/settings'
    )).response.objects[0]

    await this.localSettingsService.setAlertsNotificationsTurnedOn(settings.enabled)
    await this.localSettingsService.setAlertsSoundTurnedOn(settings.sound)
    await this.localSettingsService.setQuietHoursTurnedOn(settings.quietHoursEnabled)

    if (settings.from && settings.to) {

      const fromHmsSplit = settings.from.split(':')
      const toHmsSplit = settings.to.split(':')

      const utcFrom = new Date()
      utcFrom.setHours(+fromHmsSplit[0])
      utcFrom.setMinutes(+fromHmsSplit[1])

      const utcTo = new Date()
      utcTo.setHours(+toHmsSplit[0])
      utcTo.setMinutes(+toHmsSplit[1])

      const offset = new Date().getTimezoneOffset() * 60 * 1000 // minutes to ms

      const fromLocal = new Date(+utcFrom - offset)
      const toLocal = new Date(+utcTo - offset)

      const fromHours = fromLocal.getHours()
      const fromMinutes = fromLocal.getMinutes()

      const toHours = toLocal.getHours()
      const toMinutes = toLocal.getMinutes()

      const from = JSON.stringify(new Time(fromHours, fromMinutes))
      const to = JSON.stringify(new Time(toHours, toMinutes))

      await this.localSettingsService.setQuietHoursStart(from)
      await this.localSettingsService.setQuietHoursEnd(to)
    }

    return Promise.resolve()
  }

  @onEvent(EVENTS.login)
  async updateDeviceId() {
    const token = await firebase.messaging()
                                .getToken()

    console.log('GOT FCMTOKEN', token)
    let resp2 = {}
    const deviceId = await Fetch.post(configuration.remoteApi.base + '/device-tokens/register',
      {}, response => {resp2 = response; return response._bodyText})

    console.log('DEVICEID', deviceId)

    console.log('REGISTERED DEVICE WITH ID', deviceId)

    await this.localSettingsService.saveValue('DEVICEID', deviceId)

    this.updateToken(token, deviceId)
  }

  async updateToken(token, deviceId) {
    console.log('UPDATING TOKEN FOR DEVICE ID ' + deviceId + ' WITH VALUE ' + token)

    return Fetch.postForm(
      configuration.remoteApi.base + '/device-tokens/update/' + deviceId,
      'token=' + token, response => response)
  }

}

const notificationService = new NotificationService(NotificationModel)

export default notificationService

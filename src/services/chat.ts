import DefaultBaseService from './base/impl/default'
import Query from '../lib/smart-criteria/query'
import {injectable} from 'inversify'
import PeekableRecordManager from '../repositories/base/peekable-record-manager'
import ChatModel from '../models/chat'
import {mixin} from '../annotations/common'
import {LogoutClearable} from './mixins/logout-clearable'
import {
  listener,
  onEvent
} from '../annotations/event'
import {EVENTS} from '../configs/dicts'
import {lazy} from '../annotations/inversify'
import {RabbitCredentialService} from './rabbit-credential'
import {ProfileService} from './profile'
import {ChatMemberService} from './chat-member'

@injectable()
@listener('Chat')
@mixin([LogoutClearable])
export class ChatService extends DefaultBaseService<ChatModel, PeekableRecordManager<ChatModel, Query>> {

  private subscription: { unsubscribe: () => void }

  @lazy('RabbitCredentialService')
  private rabbitCredentialService: RabbitCredentialService

  @lazy('ChatMemberService')
  private chatMemberService: ChatMemberService

  @lazy('ProfileService')
  private profileService: ProfileService

  @onEvent(EVENTS.rabbitConnectionEstablished)
  @onEvent(EVENTS.activeProfilesChanged)
  @onEvent(EVENTS.newProfile)
  @onEvent(EVENTS.login)
  async prepareConnection() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }

    try {
      this.subscription = await this.rabbitCredentialService.subscribe(
        'MESSAGE',
        message => this.handleNewMessage(message)
      )
    } catch (error) {
      console.log(error)
    }

  }

  async getAllForProfile(profileId: number) {
    const chatMembers = await this.chatMemberService.getAllActiveForProfile(profileId)

    return chatMembers.sort((a, b) => {
                        if (a.score < b.score) {
                          return 1
                        } else if (a.score > b.score) {
                          return -1
                        } else if (a.chat.lastMessageDate < b.chat.lastMessageDate) {
                          return 1
                        } else if (a.chat.lastMessageDate > b.chat.lastMessageDate) {
                          return -1
                        }
                        return 0
                      })
                      .map(it => it.chat)
  }

  getAllForCurrentProfile() {
    const activeProfileId = this.profileService.getActiveProfileId()

    return this.getAllForProfile(activeProfileId)
  }

  getConversation(profileId: number) {
    const activeProfileId = this.profileService.getActiveProfileId()

    return this.getRepo()
               .findByPrimary(`me/${activeProfileId}/${profileId}`)
  }

  async newConversation(profileId: number) {
    const activeProfileId = this.profileService.getActiveProfileId()

    const maybeRemoteConversation = await this.getConversation(profileId)

    if (maybeRemoteConversation) {
      return maybeRemoteConversation
    }

    const chat = await this.getRepo()
                           .createRecord()
                           .save()

    await Promise.all([
      this.chatMemberService.newMemberToChat(profileId, chat),
      this.chatMemberService.newMemberToChat(activeProfileId, chat, 'OWNER')
    ])

    return chat

  }

  async getTotalUnreadPreferred(profileId: number) {
    const members = await this.getMembers(profileId)

    return members.filter(it => it.score > 0)
                  .reduce((acc, it) => acc + it.chat.lastOrderNumber - it.lastViewedOrderNumber, 0)
  }

  async getTotalUnreadUnPreferred(profileId: number) {
    const members = await this.getMembers(profileId)

    return members.filter(it => it.score < 0)
                  .reduce((acc, it) => acc + it.chat.lastOrderNumber - it.lastViewedOrderNumber, 0)
  }

  async getTotalUnreadNeutral(profileId: number) {
    const members = await this.getMembers(profileId)

    return members.filter(it => it.score === 0)
                  .reduce((acc, it) => acc + it.chat.lastOrderNumber - it.lastViewedOrderNumber, 0)
  }

  private async getMembers(profileId: number) {
    const chats = await this.getAllForProfile(profileId)
    return Promise.all(chats.map(it => this.chatMemberService.getForChat(it, profileId)))
  }

  private async handleNewMessage(message: any) {
    const profileId = JSON.parse(JSON.parse(message.body).payload).chatMember.profileId
    const profile = await this.profileService.getByPrimary(profileId)
    const activeProfileId = this.profileService.getActiveProfileId()
    if (profile && profile.id !== activeProfileId) {
      // stub. was replaced by FCM push notifications
      // but we may need this callback to notify IN APP
    }
  }

}

const chatService = new ChatService(ChatModel)

export default chatService

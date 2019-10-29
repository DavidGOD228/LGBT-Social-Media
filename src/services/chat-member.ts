import DefaultBaseService from './base/impl/default'
import Query from '../lib/smart-criteria/query'
import {injectable} from 'inversify'
import PeekableRecordManager from '../repositories/base/peekable-record-manager'
import ChatMemberModel, {ChatMemberRole} from '../models/chat-member'
import {LogoutClearable} from './mixins/logout-clearable'
import {mixin} from '../annotations/common'
import {listener} from '../annotations/event'
import ChatModel from '../models/chat'
import Restrictions from '../lib/smart-criteria/restrictions'
import {ProfileService} from './profile'
import {lazy} from '../annotations/inversify'

@injectable()
@listener('ChatMember')
@mixin([LogoutClearable])
export class ChatMemberService
  extends DefaultBaseService<ChatMemberModel, PeekableRecordManager<ChatMemberModel, Query>> {

  @lazy('ProfileService')
  private profileService: ProfileService

  async newMemberToChat(profileId: number, chat: ChatModel, memberRole: ChatMemberRole = 'MEMBER') {
    try {
      const chatMemberModel = await this.getForChat(chat, profileId)

      if (chatMemberModel) {
        return this.addMemberToChat(chatMemberModel, memberRole)
      }
    } catch (error) {
      console.log(error)
    }

    const activeProfileId = this.profileService.getActiveProfileId()

    const member = this.getRepo()
                       .createRecord()
                       .set('profileId', profileId)
                       .set('chat', chat)
                       .set('memberRole', memberRole)

    if (memberRole === 'GUEST') {
      member.set('invitingProfileId', activeProfileId)
    }

    return member.save()
  }

  addMemberToChat(chatMember: ChatMemberModel, memberRole: ChatMemberRole = 'GUEST') {
    return chatMember.set('memberRole', memberRole)
                     .save()
  }

  removeMemberFromChat(chatMember: ChatMemberModel) {
    return chatMember.set('memberRole', 'OUT')
                     .save()
  }

  async getForChat(chat: ChatModel, profileId: number): Promise<ChatMemberModel> {
    const maybeMember = await this.getRepo()
                                  .peekRecord(`profileId = ${profileId} AND chat.id = ${chat.id}`)

    if (maybeMember) {
      return maybeMember
    }

    return this.fetchForChat(chat, profileId)
  }

  async fetchForChat(chat: ChatModel, profileId: number): Promise<ChatMemberModel> {
    const query = new Query()

    query.add(Restrictions.equal('chat.id', chat.id))
         .add(Restrictions.equal('profileId', profileId))

    const chatMember = await this.getRepo()
                                 .findRecord(query)
    if (!chatMember) {
      throw new Error('chat member not found')
    }

    return chatMember
  }

  getMeForChat(chat: ChatModel) {
    const activeProfileId = this.profileService.getActiveProfileId()

    return this.getForChat(chat, activeProfileId)
  }

  async getAllActiveForChat(chat: ChatModel) {
    const query = new Query()

    query.add(Restrictions.equal('chat.id', chat.id))
         .add(Restrictions.contain('memberRole', ['OWNER', 'MEMBER', 'GUEST']))

    // const mayBeLocal = await this.getRepo()
    //                              .peek(`chat.id = ${chat.id}`)

    return /*mayBeLocal.length ? mayBeLocal : */await this.getRepo()
                                                          .find(query)
  }

  getAllActiveForProfile(profileId: number) {
    const query = new Query()
    query.add(Restrictions.equal('profileId', profileId))
         .add(Restrictions.equal('chat.blocked', false))
         .add(Restrictions.equal('chatHidden', false))
         .add(Restrictions.contain('memberRole', ['OWNER', 'MEMBER', 'GUEST']))
         .setSort(Restrictions.desc('score'))

    return this.getRepo()
               .find(query)
  }

}

const chatMemberService = new ChatMemberService(ChatMemberModel)

export default chatMemberService

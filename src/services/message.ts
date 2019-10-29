import DefaultBaseService from './base/impl/default'
import Query from '../lib/smart-criteria/query'
import {injectable} from 'inversify'
import PeekableRecordManager from '../repositories/base/peekable-record-manager'
import MessageModel from '../models/message'
import {LogoutClearable} from './mixins/logout-clearable'
import {mixin} from '../annotations/common'
import {listener} from '../annotations/event'
import {MessageContentService} from './message-content'
import {lazy} from '../annotations/inversify'
import ChatModel from '../models/chat'
import {ChatMemberService} from './chat-member'
import Restrictions from '../lib/smart-criteria/restrictions'
import {MessageContentType} from '../models/message-content'
import Fetch from '../utils/fetch'
import configuration from '../configs/index'
import {SendMessageDto} from '../models/send-message-dto'

@injectable()
@listener('Message')
@mixin([LogoutClearable])
export class MessageService extends DefaultBaseService<MessageModel, PeekableRecordManager<MessageModel, Query>> {

  @lazy('MessageContentService')
  private messageContentService: MessageContentService

  @lazy('ChatMemberService')
  private chatMemberService: ChatMemberService

  async newMessage(chat: ChatModel, text: string, type: MessageContentType = 'TEXT') {

    const me = await this.chatMemberService.getMeForChat(chat)

    if (!me) {
      throw new Error('no me in chat members')
    }
    const sendMessageDto = new SendMessageDto(text, type)
    return Fetch.post(`${configuration.remoteApi.base}/chats/${chat.id}/sendMessage`, sendMessageDto)
                .then((response) => response.response.objects[0].message)
  }

  async getAllForChat(chat: ChatModel) {

    const cachedMessages = await this.getRepo()
                                     .peek(`chat.id = ${chat.id}`)

    const lastMessageOrder = cachedMessages.reduce((acc, it) => acc < it.orderNumber ? it.orderNumber : acc, 0)

    const gaps = [0]

    for (let i = 1; i < lastMessageOrder; i++) {
      if (!cachedMessages.find(message => message.orderNumber === i)) {
        gaps.push(i)
      }
    }

    const query = new Query()
    query.add(Restrictions.equal('chat.id', chat.id))
         .add(Restrictions.disjunction(
           Restrictions.more('orderNumber', lastMessageOrder),
           Restrictions.contain('orderNumber', gaps)
         ))
         .setSort(Restrictions.asc('orderNumber'))

    const newMessages = await this.getRepo()
                                  .find(query)

    return cachedMessages.concat(newMessages)
                         .sort((a, b) => a.orderNumber < b.orderNumber ? -1 : 1)
  }

  async getLastForChat(chat: ChatModel) {
    const query = new Query()
    query.add(Restrictions.equal('chat.id', chat.id))
         .setSort(Restrictions.desc('orderNumber'))
         .setLimit(1)

    return await this.getRepo()
                     .findRecord(query)
  }

  getContentFor(message: MessageModel) {
    return this.messageContentService.getForMessage(message)
  }

}

const messageService = new MessageService(MessageModel)

export default messageService

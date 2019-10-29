import DefaultModel from './base/impl/default-model'
import {
  attr,
  modelName,
  primaryKey,
  toOne
} from '../annotations/model'
import ChatModel from './chat'
import ChatMemberModel from './chat-member'

export type MessageType = 'DIRECT' | 'FORWARD'

@modelName('Message')
class MessageModel extends DefaultModel {

  @attr('int')
  @primaryKey()
  id: number

  @attr()
  @toOne('Chat')
  chat: ChatModel

  @attr('string')
  messageType: MessageType

  @attr()
  @toOne('ChatMember')
  chatMember: ChatMemberModel

  @attr()
  orderNumber: number

}

export default MessageModel

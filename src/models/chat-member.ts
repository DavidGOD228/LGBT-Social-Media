import DefaultModel from './base/impl/default-model'
import {
  attr,
  modelName,
  optional,
  primaryKey,
  toOne
} from '../annotations/model'
import ChatModel from './chat'

export type ChatMemberRole = 'OWNER' | 'MEMBER' | 'GUEST' | 'OUT'

@modelName('ChatMember')
class ChatMemberModel extends DefaultModel {

  @attr('int')
  @primaryKey()
  id: number

  @attr()
  profileId: number

  @attr()
  @toOne('Chat')
  chat: ChatModel

  @attr()
  score: number

  @attr()
  @optional()
  invitingProfileId: number

  @attr()
  lastViewedOrderNumber: number

  @attr('string')
  memberRole: ChatMemberRole

  @attr()
  chatHidden: boolean
}

export default ChatMemberModel

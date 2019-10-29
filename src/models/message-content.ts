import DefaultModel from './base/impl/default-model'
import {
  attr,
  modelName,
  primaryKey,
  toOne
} from '../annotations/model'
import MessageModel from './message'

export type MessageContentType = 'TEXT' | 'IMAGE' | 'FILE'

@modelName('MessageContent')
class MessageContentModel extends DefaultModel {

  @attr('int')
  @primaryKey()
  id: number

  @attr('string')
  contentType: MessageContentType

  @attr()
  @toOne('Message')
  message: MessageModel

  @attr()
  text: string

}

export default MessageContentModel

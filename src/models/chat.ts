import DefaultModel from './base/impl/default-model'
import {
  attr,
  modelName,
  primaryKey
} from '../annotations/model'

@modelName('Chat')
class ChatModel extends DefaultModel {

  @attr('int')
  @primaryKey()
  id: number

  @attr()
  name: string

  @attr()
  lastMessageDate: string

  @attr()
  lastOrderNumber: number

  @attr()
  blocked: boolean

  get parsedLastMessageDate() {
    return new Date(this.lastMessageDate)
  }

}

export default ChatModel

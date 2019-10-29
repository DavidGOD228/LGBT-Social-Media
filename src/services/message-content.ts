import DefaultBaseService from './base/impl/default'
import Query from '../lib/smart-criteria/query'
import {injectable} from 'inversify'
import PeekableRecordManager from '../repositories/base/peekable-record-manager'
import MessageContentModel, {MessageContentType} from '../models/message-content'
import {mixin} from '../annotations/common'
import {LogoutClearable} from './mixins/logout-clearable'
import {listener} from '../annotations/event'
import MessageModel from '../models/message'
import Restrictions from '../lib/smart-criteria/restrictions'

@injectable()
@listener('MessageContent')
@mixin([LogoutClearable])
export class MessageContentService
  extends DefaultBaseService<MessageContentModel, PeekableRecordManager<MessageContentModel, Query>> {

  // DEPRECATED
  newMessage(text: string, message: MessageModel, type: MessageContentType) {
    console.warn('MessageContentService', 'attempted to call newMessage, but it is deprecated, ' +
      'see MessageService.newMessage method for reference (now using SendMessageDto)')
    return this.getRepo()
               .createRecord()
               .set('contentType', type)
               .set('message', message)
               .set('text', text)
               .save()
  }

  async getForMessage(message: MessageModel) {

    const maybeContent = await this.getRepo()
                                   .peekRecord(`message.id = ${message.id}`)

    if (maybeContent) {
      return maybeContent
    }

    const query = new Query()
    query.add(Restrictions.equal('message.id', message.id))

    return await this.getRepo()
                     .findRecord(query)
  }

}

const messageContentService = new MessageContentService(MessageContentModel)

export default messageContentService

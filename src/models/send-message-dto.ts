import {MessageContentType} from './message-content'

export class SendMessageDto {

  content: string
  contentType: MessageContentType

  constructor(content: string, contentType: MessageContentType) {
    this.content = content
    this.contentType = contentType
  }
}

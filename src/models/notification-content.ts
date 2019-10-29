import DefaultModel from './base/impl/default-model'
import {
  attr,
  modelName,
  primaryKey
} from '../annotations/model'

@modelName('NotificationContent')
class NotificationContentModel extends DefaultModel {

  @attr('int')
  @primaryKey()
  id: number

  @attr()
  content: string

  get parsedContent() {
    return JSON.parse(this.content)
  }

  set parsedContent(value) {
    this.content = JSON.stringify(value)
  }
}

export default NotificationContentModel

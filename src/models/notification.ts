import DefaultModel from './base/impl/default-model'
import {
  attr,
  modelName,
  primaryKey,
  toOne
} from '../annotations/model'
import NotificationContentModel from './notification-content'

export type NotificationType =
  'MESSAGE'
  | 'MEDIA_REQUEST'
  | 'PROFILE_WAS_VIEWED'
  | 'PROFILE_WAS_FAVORITE'
  | 'PROFILE_WAS_FLEXED'
  | 'PERMISSION'

export type NotificationStatus = 'UNREAD' | 'READ' | 'ARCHIVED'

@modelName('Notification')
class NotificationModel extends DefaultModel {

  @attr('int')
  @primaryKey()
  id: number

  @attr('string')
  type: NotificationType

  @attr('string')
  status: NotificationStatus

  @attr()
  @toOne('NotificationContent')
  notificationContent: NotificationContentModel

  @attr()
  profileId: number

  @attr()
  createdDate: string

}

export default NotificationModel

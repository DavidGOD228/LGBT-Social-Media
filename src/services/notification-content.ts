import DefaultBaseService from './base/impl/default'
import Query from '../lib/smart-criteria/query'
import {injectable} from 'inversify'
import PeekableRecordManager from '../repositories/base/peekable-record-manager'
import {LogoutClearable} from './mixins/logout-clearable'
import {mixin} from '../annotations/common'
import {listener} from '../annotations/event'
import NotificationContentModel from '../models/notification-content'

@injectable()
@listener('NotificationContent')
@mixin([LogoutClearable])
export class NotificationContentService
  extends DefaultBaseService<NotificationContentModel, PeekableRecordManager<NotificationContentModel, Query>> {

}

const notificationContentService = new NotificationContentService(NotificationContentModel)

export default notificationContentService

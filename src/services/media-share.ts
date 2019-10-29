import {injectable} from 'inversify'
import {LogoutClearable} from './mixins/logout-clearable'
import {mixin} from '../annotations/common'
import {listener} from '../annotations/event'
import MediaShareModel from '../models/media-share'
import PeekableRecordManager from '../repositories/base/peekable-record-manager'
import DefaultBaseService from './base/impl/default'
import Query from '../lib/smart-criteria/query'

@injectable()
@listener('MediaRequest')
@mixin([LogoutClearable])
export class MediaShareService
  extends DefaultBaseService<MediaShareModel, PeekableRecordManager<MediaShareModel, Query>> {

}

const mediaShareService = new MediaShareService(MediaShareModel)

export default mediaShareService

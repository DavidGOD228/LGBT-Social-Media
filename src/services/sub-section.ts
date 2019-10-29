import DefaultBaseService from './base/impl/default'
import Query from '../lib/smart-criteria/query'
import {injectable} from 'inversify'
import PeekableRecordManager from '../repositories/base/peekable-record-manager'
import SubSectionModel from '../models/sub-section'
import {LogoutClearable} from './mixins/logout-clearable'
import {mixin} from '../annotations/common'
import {listener} from '../annotations/event'

@injectable()
@listener('SubSection')
@mixin([LogoutClearable])
export class SubSectionService
  extends DefaultBaseService<SubSectionModel, PeekableRecordManager<SubSectionModel, Query>> {

}

const subSectionService = new SubSectionService(SubSectionModel)

export default subSectionService

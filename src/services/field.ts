import DefaultBaseService from './base/impl/default'
import FieldModel from '../models/field'
import Query from '../lib/smart-criteria/query'
import {injectable} from 'inversify'
import PeekableRecordManager from '../repositories/base/peekable-record-manager'
import {LogoutClearable} from './mixins/logout-clearable'
import {mixin} from '../annotations/common'
import {listener} from '../annotations/event'

@injectable()
@listener('Field')
@mixin([LogoutClearable])
export class FieldService extends DefaultBaseService<FieldModel, PeekableRecordManager<FieldModel, Query>> {

}

const fieldService = new FieldService(FieldModel)

export default fieldService

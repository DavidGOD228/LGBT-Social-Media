import DefaultBaseService from './base/impl/default'
import Query from '../lib/smart-criteria/query'
import {injectable} from 'inversify'
import PeekableRecordManager from '../repositories/base/peekable-record-manager'
import {LogoutClearable} from './mixins/logout-clearable'
import {mixin} from '../annotations/common'
import {listener} from '../annotations/event'
import SearchFieldModel from '../models/search/search-field'

@injectable()
@listener('SearchField')
@mixin([LogoutClearable])
export class SearchFieldService
  extends DefaultBaseService<SearchFieldModel, PeekableRecordManager<SearchFieldModel, Query>> {

}

const searchFieldService = new SearchFieldService(SearchFieldModel)

export default searchFieldService

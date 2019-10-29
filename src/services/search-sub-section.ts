import DefaultBaseService from './base/impl/default'
import Query from '../lib/smart-criteria/query'
import {injectable} from 'inversify'
import PeekableRecordManager from '../repositories/base/peekable-record-manager'
import {LogoutClearable} from './mixins/logout-clearable'
import {mixin} from '../annotations/common'
import {listener} from '../annotations/event'
import SearchSubSectionModel from '../models/search/search-sub-section'

@injectable()
@listener('SearchSubSection')
@mixin([LogoutClearable])
export class SearchSubSectionService
  extends DefaultBaseService<SearchSubSectionModel, PeekableRecordManager<SearchSubSectionModel, Query>> {

}

const searchSubSectionService = new SearchSubSectionService(SearchSubSectionModel)

export default searchSubSectionService

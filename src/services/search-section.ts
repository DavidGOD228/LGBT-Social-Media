import DefaultBaseService from './base/impl/default'
import SearchSectionModel from '../models/search/search-section'
import Query from '../lib/smart-criteria/query'
import {injectable} from 'inversify'
import PeekableRecordManager from '../repositories/base/peekable-record-manager'
import Restrictions from '../lib/smart-criteria/restrictions'
import {LogoutClearable} from './mixins/logout-clearable'
import {mixin} from '../annotations/common'
import {listener} from '../annotations/event'
import {memo} from '../annotations/eval'

@injectable()
@listener('SearchSection')
@mixin([LogoutClearable])
export class SearchSectionService
  extends DefaultBaseService<SearchSectionModel, PeekableRecordManager<SearchSectionModel, Query>> {

  @memo()
  getAllByProfileTypeCode(profileTypeCode: string): Promise<SearchSectionModel[]> {
    const query = new Query()
    query.add(Restrictions.equal('profileType', profileTypeCode))
    // todo: add sort condition here
    return this.getRepo()
               .find(query)
  }

}

const searchSectionService = new SearchSectionService(SearchSectionModel)

export default searchSectionService

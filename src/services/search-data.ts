import DefaultBaseService from './base/impl/default'
import SearchDataModel from '../models/field-data/search-data'
import Query from '../lib/smart-criteria/query'
import {injectable} from 'inversify'
import PeekableRecordManager from '../repositories/base/peekable-record-manager'
import {LogoutClearable} from './mixins/logout-clearable'
import {mixin} from '../annotations/common'
import {listener} from '../annotations/event'
import FieldModel from '../models/field'
import ProfileModel from '../models/profile'

@injectable()
@listener('SearchData')
@mixin([LogoutClearable])
export class SearchDataService
  extends DefaultBaseService<SearchDataModel, PeekableRecordManager<SearchDataModel, Query>> {

  createNew(field: FieldModel, profile: ProfileModel): SearchDataModel {
    return this.getRepo()
               .createRecord()
               .set('field', field)
               .set('profileId', profile.id)
               .set('fieldValues', [])
  }
}

const searchDataService = new SearchDataService(SearchDataModel)

export default searchDataService

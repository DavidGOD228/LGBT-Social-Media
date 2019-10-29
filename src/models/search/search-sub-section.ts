import DefaultModel from '../base/impl/default-model'
import {
  attr,
  modelName,
  primaryKey,
  toMany
} from '../../annotations/model'
import SearchFieldModel from './search-field'

@modelName('SearchSubSection')
class SearchSubSectionModel extends DefaultModel {

  @attr('int')
  @primaryKey()
  id: number

  @attr()
  name: string

  @attr()
  sort: number

  @attr()
  @toMany('SearchField')
  searchFields: SearchFieldModel[]
}

export default SearchSubSectionModel

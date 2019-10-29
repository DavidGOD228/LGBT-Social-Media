import DefaultModel from '../base/impl/default-model'
import {
  attr,
  modelName,
  primaryKey,
  toMany
} from '../../annotations/model'
import SearchSubSectionModel from './search-sub-section'
import {ProfileType} from '../profile'

@modelName('SearchSection')
class SearchSectionModel extends DefaultModel {

  @attr('int')
  @primaryKey()
  id: number

  @attr('string')
  profileType: ProfileType

  @attr()
  name: string

  @attr()
  sort: number

  @attr()
  @toMany('SearchSubSection')
  searchSubSections: SearchSubSectionModel[]
}

export default SearchSectionModel

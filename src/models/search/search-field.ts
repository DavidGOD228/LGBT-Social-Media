import DefaultModel from '../base/impl/default-model'
import {
  attr,
  modelName,
  primaryKey,
  toOne
} from '../../annotations/model'
import FieldModel from '../field'

export type FieldType = 'STRING'

@modelName('SearchField')
class SearchFieldModel extends DefaultModel {

  @attr('int')
  @primaryKey()
  id: number

  @attr()
  name: string

  @attr()
  sort: number

  @attr('string')
  path: string

  @attr()
  @toOne('Field')
  field: FieldModel

}

export default SearchFieldModel

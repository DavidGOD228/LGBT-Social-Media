import {
  attr,
  modelName,
  primaryKey,
  remotePathUrl,
  toMany,
  toOne
} from '../../annotations/model'
import FieldDataModel from './field-data'
import FieldModel from '../field'
import FieldValueModel from '../field-value'

@modelName('SearchData')
@remotePathUrl('search-datas')
class SearchDataModel extends FieldDataModel {

  @attr('int')
  @primaryKey()
  id: number

  @attr()
  name: string

  @attr()
  profileId: number

  @attr()
  @toOne('Field')
  field: FieldModel

  @attr()
  @toMany('FieldValue')
  fieldValues: FieldValueModel[]
}

export default SearchDataModel

import DefaultModel from '../base/impl/default-model'
import {
  attr,
  modelName,
  primaryKey,
  toOne
} from '../../annotations/model'
import FieldModel from '../field'

@modelName('ProfileViewField')
class ProfileViewFieldModel extends DefaultModel {

  @attr('int')
  @primaryKey()
  id: number

  @attr()
  name: string

  @attr()
  sort: number

  @attr()
  @toOne('Field')
  field: FieldModel

}

export default ProfileViewFieldModel

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

@modelName('ProfileData')
@remotePathUrl('profile-datas')
class ProfileDataModel extends FieldDataModel {
  @attr('int')
  @primaryKey()
  id: number

  @attr()
  profileId: number

  @attr()
  @toOne('Field')
  field: FieldModel

  @attr()
  @toMany('FieldValue')
  fieldValues: FieldValueModel[]
}

export default ProfileDataModel

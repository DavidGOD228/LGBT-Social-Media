import DefaultModel from './base/impl/default-model'
import {
  attr,
  modelName,
  primaryKey
} from '../annotations/model'

@modelName('ProfileType')
class ProfileTypeModel extends DefaultModel {

  @attr('int')
  @primaryKey()
  id: number

  @attr()
  name: string

  @attr()
  code: string
}

export default ProfileTypeModel

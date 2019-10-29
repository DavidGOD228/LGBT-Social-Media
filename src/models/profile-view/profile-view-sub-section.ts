import DefaultModel from '../base/impl/default-model'
import {
  attr,
  modelName,
  primaryKey,
  toMany
} from '../../annotations/model'
import ProfileViewFieldModel from './profile-view-field'

@modelName('ProfileViewSubSection')
class ProfileViewSubSectionModel extends DefaultModel {
  @attr('int')
  @primaryKey()
  id: number

  @attr()
  name: string

  @attr()
  sort: number

  @attr()
  @toMany('ProfileViewField')
  profileViewFields: ProfileViewFieldModel[]

}

export default ProfileViewSubSectionModel

import DefaultModel from '../base/impl/default-model'
import {
  attr,
  modelName,
  primaryKey,
  toMany
} from '../../annotations/model'
import ProfileViewSubSectionModel from './profile-view-sub-section'
import {ProfileType} from '../profile'

@modelName('ProfileViewSection')
class ProfileViewSectionModel extends DefaultModel {
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
  @toMany('ProfileViewSubSection')
  profileViewSubSections: ProfileViewSubSectionModel[]
}

export default ProfileViewSectionModel

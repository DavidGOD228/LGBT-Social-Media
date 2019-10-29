import DefaultModel from './base/impl/default-model'
import ProfileTypeModel from './profile-type'
import {
  attr,
  modelName,
  optional,
  primaryKey,
  toOne
} from '../annotations/model'
import configuration from '../configs/index'

export type ProfileType = 'FUN' | 'FLIRT' | 'FRIEND'

@modelName('Profile')
class ProfileModel extends DefaultModel {

  @attr('int')
  @primaryKey()
  id: number

  @attr()
  nickname: string

  @attr()
  mediaId: number

  @attr()
  active: boolean

  @attr()
  invisible: boolean

  @attr()
  @optional()
  completed: boolean

  @attr()
  @toOne('ProfileType')
  profileType: ProfileTypeModel

  get avatar() {
    return {uri: `${configuration.remoteApi.base}/medias/download/${this.mediaId}?type=SMALL`}
  }
}

export default ProfileModel

import {
  attr,
  modelName,
  primaryKey
} from '../annotations/model'
import ProfileInteractionModel from './base/profile-interaction'

@modelName('ProfileVisit')
class ProfileVisitModel extends ProfileInteractionModel {

  @attr('int')
  @primaryKey()
  id: number

  @attr()
  sourceProfileId: number

  @attr()
  targetProfileId: number

}

export default ProfileVisitModel

import DefaultModel from './base/impl/default-model'
import {
  attr,
  modelName,
  primaryKey,
} from '../annotations/model'

@modelName('CommunityView')
class CommunityViewModel extends DefaultModel {

  @attr('int')
  @primaryKey()
  id: number

  @attr()
  profileId: number

  @attr()
  nickname: string

  @attr()
  mediaId: number

  @attr()
  status: string

}

export default CommunityViewModel

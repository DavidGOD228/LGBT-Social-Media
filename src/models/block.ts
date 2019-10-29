import {
  attr,
  modelName,
  optional,
  primaryKey
} from '../annotations/model'
import ProfileInteractionToggleModel from './base/profile-interaction-toggle'

@modelName('Block')
class BlockModel extends ProfileInteractionToggleModel {

  @attr('int')
  @primaryKey()
  id: number

  @attr()
  sourceProfileId: number

  @attr()
  targetProfileId: number

  @attr()
  startDate: string

  @attr()
  @optional()
  endDate: string

}

export default BlockModel

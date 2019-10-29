import DefaultModel from './base/impl/default-model'
import {
  attr,
  modelName
} from '../annotations/model'

export type PacketType = 'MESSAGE'

@modelName('RabbitCredential')
class RabbitCredentialModel extends DefaultModel {

  @attr()
  id: string

  @attr('string')
  type: PacketType

  @attr()
  payload: string
}

export default RabbitCredentialModel

import DefaultModel from './base/impl/default-model'
import {
  attr,
  modelName
} from '../annotations/model'

@modelName('RabbitCredential')
class RabbitCredentialModel extends DefaultModel {

  @attr()
  exchange: string

  @attr()
  protocol: string

  @attr()
  host: string

  @attr()
  port: string

  @attr()
  virtualHost: string

  @attr()
  username: string

  @attr()
  password: string
}

export default RabbitCredentialModel

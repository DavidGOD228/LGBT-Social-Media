import DefaultModel from './base/impl/default-model'
import {
  attr,
  modelName,
  primaryKey
} from '../annotations/model'

@modelName('LocalSettings')
class LocalSettingsModel extends DefaultModel {

  @attr()
  @primaryKey()
  id: string

  @attr()
  value: string
}

export default LocalSettingsModel

import DefaultModel from './base/impl/default-model'
import {
  attr,
  modelName,
  optional,
  primaryKey
} from '../annotations/model'

@modelName('FieldValue')
class FieldValueModel extends DefaultModel {

  @attr('int')
  @primaryKey()
  id: number

  @attr()
  path: string

  @attr()
  value: string

  @attr()
  @optional()
  sort: number
}

export default FieldValueModel

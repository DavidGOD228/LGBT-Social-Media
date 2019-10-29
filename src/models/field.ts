import DefaultModel from './base/impl/default-model'
import FieldValueModel from './field-value'
import {
  attr,
  modelName,
  primaryKey,
  toMany
} from '../annotations/model'

export type FieldType = 'STRING'

@modelName('Field')
class FieldModel extends DefaultModel {

  @attr('int')
  @primaryKey()
  id: number

  @attr()
  name: string

  @attr()
  sort: number

  @attr('string')
  type: FieldType

  @attr()
  @toMany('FieldValue')
  fieldValues: FieldValueModel[]
}

export default FieldModel

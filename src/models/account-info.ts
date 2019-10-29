import DefaultModel from './base/impl/default-model'
import {
  attr,
  modelName,
  optional,
  primaryKey
} from '../annotations/model'

@modelName('AccountInfo')
class AccountInfoModel extends DefaultModel {

  @attr('int')
  @primaryKey()
  id: number

  @attr()
  firstName: string

  @attr()
  lastName: string

  @attr()
  @optional()
  birthDay: string
}

export default AccountInfoModel

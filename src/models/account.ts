import DefaultModel from './base/impl/default-model'
import AccountInfoModel from './account-info'
import ProfileModel from './profile'
import {
  attr,
  indexed,
  modelName,
  optional,
  primaryKey,
  remoteBaseUrl,
  remotePathUrl,
  toMany,
  toOne
} from '../annotations/model'
import configuration from '../configs/index'

@modelName('Account')
@remoteBaseUrl(configuration.remoteApi.base) // default value
@remotePathUrl('accounts') // default - pluralized and lowerCased name of model
class AccountModel extends DefaultModel {

  @attr('int')
  @primaryKey()
  @indexed() // default for primary key
  id: number

  @attr()
  email: string

  @attr()
  @optional()
  password: string

  @attr()
  confirmed: boolean

  @attr()
  @toMany('Profile')
  profiles: ProfileModel[]

  @attr()
  @toOne('AccountInfo')
  @optional()
  accountInfo: AccountInfoModel
}

export default AccountModel

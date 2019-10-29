import DefaultBaseService from './base/impl/default'
import AccountInfoModel from '../models/account-info'
import Query from '../lib/smart-criteria/query'
import {injectable} from 'inversify'
import PeekableRecordManager from '../repositories/base/peekable-record-manager'
import {LogoutClearable} from './mixins/logout-clearable'
import {mixin} from '../annotations/common'
import {listener} from '../annotations/event'

@injectable()
@listener('AccountInfo')
@mixin([LogoutClearable])
export class AccountInfoService
  extends DefaultBaseService<AccountInfoModel, PeekableRecordManager<AccountInfoModel, Query>> {

  createNew(firstName: string, lastName: string): AccountInfoModel {
    return this.getRepo()
               .createRecord()
               .set('firstName', firstName)
               .set('lastName', lastName)
  }
}

const accountInfoService = new AccountInfoService(AccountInfoModel)

export default accountInfoService

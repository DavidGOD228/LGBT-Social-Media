import DefaultBaseService from './base/impl/default'
import PeekableRecordManager from '../repositories/base/peekable-record-manager'
import Query from '../lib/smart-criteria/query'
import {LogoutClearable} from './mixins/logout-clearable'
import {mixin} from '../annotations/common'
import {listener} from '../annotations/event'
import {injectable} from 'inversify'
import ProfileViewFieldModel from '../models/profile-view/profile-view-field'

@injectable()
@listener('ProfileViewField')
@mixin([LogoutClearable])
export class ProfileViewFieldService
  extends DefaultBaseService<ProfileViewFieldModel, PeekableRecordManager<ProfileViewFieldModel, Query>> {

}

const profileViewFieldService = new ProfileViewFieldService(ProfileViewFieldModel)

export default profileViewFieldService

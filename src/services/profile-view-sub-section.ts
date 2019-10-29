import DefaultBaseService from './base/impl/default'
import PeekableRecordManager from '../repositories/base/peekable-record-manager'
import Query from '../lib/smart-criteria/query'
import {LogoutClearable} from './mixins/logout-clearable'
import {mixin} from '../annotations/common'
import {listener} from '../annotations/event'
import {injectable} from 'inversify'
import ProfileViewSubSectionModel from '../models/profile-view/profile-view-sub-section'

@injectable()
@listener('ProfileViewSubSection')
@mixin([LogoutClearable])
export class ProfileViewSubSectionService
  extends DefaultBaseService<ProfileViewSubSectionModel, PeekableRecordManager<ProfileViewSubSectionModel, Query>> {

}

const profileViewSubSectionService = new ProfileViewSubSectionService(ProfileViewSubSectionModel)

export default profileViewSubSectionService

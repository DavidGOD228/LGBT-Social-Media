import {injectable} from 'inversify'
import {LogoutClearable} from './mixins/logout-clearable'
import {mixin} from '../annotations/common'
import {listener} from '../annotations/event'
import ProfileVisitModel from '../models/profile-visit'
import ProfileInteractionService from './base/profile-interaction'
import {ProfileService} from './profile'
import {lazy} from '../annotations/inversify'

@injectable()
@listener('ProfileVisit')
@mixin([LogoutClearable])
export class ProfileVisitService
  extends ProfileInteractionService<ProfileVisitModel> {

  @lazy('ProfileService')
  protected profileService: ProfileService

  async addToProfile(profileId: number) {
    if (this.profileService.getActiveProfileId() === profileId) {
      return
    }
    const visit = await this.doAction(profileId)
    return visit.save()
  }

}

const profileVisitService = new ProfileVisitService(ProfileVisitModel)

export default profileVisitService

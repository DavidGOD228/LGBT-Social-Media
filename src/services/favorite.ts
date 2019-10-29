import {injectable} from 'inversify'
import {LogoutClearable} from './mixins/logout-clearable'
import {mixin} from '../annotations/common'
import {
  listener,
  onEvent
} from '../annotations/event'
import FavoriteModel from '../models/favorite'
import {ProfileService} from './profile'
import {lazy} from '../annotations/inversify'
import ProfileInteractionToggleService from './base/profile-interaction-toggle'
import {EVENTS} from '../configs/dicts'
import {RabbitCredentialService} from './rabbit-credential'

@injectable()
@listener('Favorite')
@mixin([LogoutClearable])
export class FavoriteService
  extends ProfileInteractionToggleService<FavoriteModel> {

  @lazy('ProfileService')
  protected profileService: ProfileService

  @lazy('RabbitCredentialService')
  private rabbitCredentialService: RabbitCredentialService

  private subscription: { unsubscribe: () => void }

  @onEvent(EVENTS.rabbitConnectionEstablished)
  @onEvent(EVENTS.activeProfilesChanged)
  @onEvent(EVENTS.newProfile)
  @onEvent(EVENTS.login)
  async prepareConnection() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }

    try {
      this.subscription = await this.rabbitCredentialService.subscribe(
        'PROFILE_WAS_FAVORITE',
        message => this.handleNewFavorite(message)
      )
    } catch (error) {
      console.log(error)
    }
  }

  favoriteProfile(profileId: number) {
    return this.doAction(profileId)
               .then(it => it.save())
  }

  getProfileFavorite(profileId: number) {
    return this.getActiveAction(profileId)
  }

  unFavoriteProfile(profileId: number) {
    return this.undoAction(profileId)
  }

  private async handleNewFavorite(message) {
    const profileId = JSON.parse(JSON.parse(message.body).payload).targetProfileId
    const profile = await this.profileService.getByPrimary(profileId)
    if (profile) {
      // stub. was replaced by FCM push notifications
      // but we may need this callback to notify IN APP
    }
  }
}

const favoriteService = new FavoriteService(FavoriteModel)

export default favoriteService

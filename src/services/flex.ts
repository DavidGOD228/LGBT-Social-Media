import {injectable} from 'inversify'
import {LogoutClearable} from './mixins/logout-clearable'
import {mixin} from '../annotations/common'
import {
  listener,
  onEvent
} from '../annotations/event'
import FlexModel from '../models/flex'
import {ProfileService} from './profile'
import {lazy} from '../annotations/inversify'
import ProfileInteractionToggleService from './base/profile-interaction-toggle'
import {EVENTS} from '../configs/dicts'
import {RabbitCredentialService} from './rabbit-credential'

@injectable()
@listener('Flex')
@mixin([LogoutClearable])
export class FlexService
  extends ProfileInteractionToggleService<FlexModel> {

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
        'PROFILE_WAS_FLEXED',
        message => this.handleNewFlex(message)
      )
    } catch (error) {
      console.log(error)
    }
  }

  flexProfile(profileId: number) {
    return this.doAction(profileId)
               .then(it => it.save())
  }

  getProfileFlex(profileId: number) {
    return this.getActiveAction(profileId)
  }

  unFlexProfile(profileId: number) {
    return this.undoAction(profileId)
  }

  private async handleNewFlex(message) {
    const profileId = JSON.parse(JSON.parse(message.body).payload).targetProfileId
    const profile = await this.profileService.getByPrimary(profileId)
    if (profile) {
      // stub. was replaced by FCM push notifications
      // but we may need this callback to notify IN APP
    }
  }
}

const flexService = new FlexService(FlexModel)

export default flexService

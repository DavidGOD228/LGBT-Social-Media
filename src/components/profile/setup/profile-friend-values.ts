import SetupProfileScreenValues from './profile-values'
import i18n from '../../../locales/i18n'

export default class SetupFriendProfileValues implements SetupProfileScreenValues {

  getProfileLabel(): any {
    return require('Musl/images/profile/icon-friend.png')
  }

  getScreenTitle(): string {
    return i18n.t('profile.setup.setupFriendProfile')
  }
}

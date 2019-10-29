import SetupProfileScreenValues from './profile-values'
import i18n from '../../../locales/i18n'

export default class SetupFlirtProfileValues implements SetupProfileScreenValues {

  getProfileLabel(): any {
    return require('Musl/images/profile/icon-flirt.png')
  }

  getScreenTitle(): string {
    return i18n.t('profile.setup.setupFlirtProfile')
  }
}

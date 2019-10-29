import i18n from '../locales/i18n'

export const EMAIL_VALIDATION = {

  email: {
    email: {
      message: `^${i18n.t('registration.error.emailText')}`
    },
    presence: true
  }
}

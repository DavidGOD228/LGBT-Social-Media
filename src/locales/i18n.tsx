import I18n from 'react-native-i18n'
import en from './translations/en'

const i18n = I18n

i18n.fallbacks = true
i18n.defaultLocale = 'en-US'
i18n.translations = {
  'en-US': en
}

export default i18n

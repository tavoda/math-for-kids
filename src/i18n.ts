import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import enTranslation from '../public/locales/en/translation.json'
import skTranslation from '../public/locales/sk/translation.json'

i18next
  .use(initReactI18next)
  .init({
	debug: true,
	supportedLngs: ['en', 'sk'],
	preload: ['en', 'sk'],
	// preload: true,
    returnEmptyString: false,
    fallbackLng: ['en', 'sk'],
    defaultNS: 'translation',
    resources: {
      en: { translation: enTranslation },
      sk: { translation: skTranslation },
    },
  })

export default i18next

import i18n, {InitOptions} from 'i18next';
import {initReactI18next} from 'react-i18next';
import HttpApi from 'i18next-http-backend';

export const initI18n = () => {
	i18n
		.use(HttpApi)
		.use(initReactI18next)
	;

	const options: InitOptions = {
		lng: process.env.I18N_LANG,
		fallbackLng: 'en',
		interpolation: {
			escapeValue: false
		}
	};

	if (process.env.I18N_LOAD_LANG_ON_BUILD) {
		options.resources = {
			en: {
				translation: require('./en.json')
			},
			[process.env.I18N_LANG]: {
				translation: require(`../../runtime/${process.env.I18N_LANG}.json`)
			}
		};
	} else {
		options.backend = {
			loadPath: '/api/i18n/load?lang={{lng}}',
		};
	}

	i18n.init(options);

	return i18n;
};
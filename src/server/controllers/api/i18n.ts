import BasicController from '../basic';
import en from '../../../i18n/en.json';

export default class ApiI18nController extends BasicController {
	async actionLoad() {
		const lang = this.request.query.lang as string;

		if (lang === 'en') {
			this.response.json(en);
			return;
		}

		const result = await this.proxyGetBackendRequest(
			'/i18n/get-json/frontend',
			{lang: this.request.query.lang as string}
		);

		if (result) {
			this.response.json(result.data);
		}
	}
}
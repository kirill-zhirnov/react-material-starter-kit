import BasicController from './basic';
import axios from 'axios';
import {IUser} from '../../@types/user';
import {makeBackendUrl} from '../../lib/utils';

export default class AuthController extends BasicController {
	async actionByUrl() {
		const {url, code, id, sign} = this.request.query;
		let error = 'error';

		try {
			const result = await axios.post<{user: IUser, url: string}>(makeBackendUrl('/public-api/auth/login-by-url'), {
				url, code, id, sign
			});

			if (result) {
				this.session.user = result.data.user;
				this.response.redirect(result.data.url);
				return;
			}
		} catch (e) {
			const {response: {data}} = e;

			if (Array.isArray(data) && data[0]?.message) {
				error = data[0].message;
			}
		}

		this.response.redirect(`/auth/login?error=${error}`);
	}
}
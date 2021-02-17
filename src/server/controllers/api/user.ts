import BasicController from '../basic';
import {IUser} from '../../../@types/user';
import axios from 'axios';
import {makeBackendUrl} from '../../../lib/utils';

export default class ApiUserController extends BasicController {
	async login() {
		try {
			const result = await axios.post<IUser>(makeBackendUrl('/public-api/auth/login'), this.request.body);
			if (result) {
				this.session.user = result.data;

				this.response
					.json({user: this.getReduxUser()})
				;
			}
		} catch (e) {
			this.processProxyError(e);
		}
	}

	async logout() {
		this.session.user = undefined;
		this.response.json(true);
	}
}
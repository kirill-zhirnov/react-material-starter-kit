import {Request, Response} from 'express';
import {Session, SessionData} from 'express-session';
import _omit from 'lodash/omit';
import {IUser, IReduxUser} from '../../@types/user';
import axios, {AxiosResponse, AxiosError, AxiosRequestConfig} from 'axios';
import {makeBackendUrl, TGetParams, yiiErrors2Formik} from '../../lib/utils';

export const VALIDATION_ERROR_HTTP_CODE = 400;

export interface FieldErrors {
	[key: string]: string;
}

export default abstract class BasicController {
	protected request: Request;
	protected response: Response;
	protected session: Session & Partial<SessionData> & {
		user?: IUser
	};

	constructor(req: Request, res: Response) {
		this.request = req;
		this.response = res;

		this.session = req.session!;
	}

	getRequest(): Request {
		return this.request;
	}

	getResponse(): Response {
		return this.response;
	}

	getUser(): IUser | null {
		if (this.session.user)
			return this.session.user;

		return null;
	}

	getReduxUser(): IReduxUser | null {
		const user = this.getUser();

		if (user) {
			return _omit(user, ['auth_token']);
		}

		return null;
	}

	async executeAction(actionName: string, allowedRoles: string[] | null = null) {
		if (allowedRoles) {
			const user = this.getUser();
			if (!user) {
				this.response.status(401).json({authRequired: true});
				return;
			}

			if (!allowedRoles.includes(user.role.alias)) {
				this.response.status(403).json({forbidden: true});
				return;
			}
		}

		if (actionName in this) {
			//@ts-ignore
			this[actionName]();
		} else {
			this.response.status(404).send('Action not found. ');
		}
	}

	async proxyGetBackendRequest<T = {}>(url: string, getParams: null | TGetParams = null): Promise<AxiosResponse<T> | false> {
		try {
			const config: AxiosRequestConfig = {};
			if (this.getUser()) {
				config.headers = {
					Authorization: `Bearer ${this.getUser()!.auth_token}`
				};
			}

			return await axios.get<T>(makeBackendUrl(url, getParams), config);
		} catch (e) {
			this.processProxyError(e);
			return false;
		}
	}

	async proxyPostBackendRequest<T = {}>(url: string): Promise<AxiosResponse<T> | false> {
		try {
			const config: AxiosRequestConfig = {};
			if (this.getUser()) {
				config.headers = {
					Authorization: `Bearer ${this.getUser()!.auth_token}`
				};
			}

			return await axios.post<T>(makeBackendUrl(url), this.request.body, config);
		} catch (e) {
			this.processProxyError(e);
			return false;
		}
	}

	processProxyError(error: AxiosError) {
		let out = {}, outStatus: number = 400;

		if (error.response) {
			const {response: {status, data}} = error;

			out = (status === 422 && Array.isArray(data))
				? yiiErrors2Formik(data)
				: data
			;

			outStatus = status;
		} else {
			console.error('error.response is empty:', error);
		}

		this.response
			.status(outStatus)
			.json(out)
		;
	}

	appendPaginationHeaders(headers: {[key: string]: string}) {
		[
			'x-pagination-total-count',
			'x-pagination-page-count',
			'x-pagination-current-page',
			'x-pagination-per-page'
		].forEach((keyName) => {
			if (keyName in headers) {
				this.response.append(keyName, headers[keyName]);
			}
		});
	}
}
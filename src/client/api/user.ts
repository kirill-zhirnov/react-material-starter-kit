import axios, {AxiosResponse} from 'axios';
import {IReduxUser} from '../../@types/user';

export function apiUserLogin(email: string, password: string): Promise<AxiosResponse<{user: IReduxUser}>> {
	return axios.post('/api/user/login', {
		email,
		password
	});
}

export function apiUserLogout(): Promise<AxiosResponse> {
	return axios.post('/api/user/logout');
}
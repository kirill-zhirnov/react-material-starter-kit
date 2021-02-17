export interface IUser {
	user_id: number;
	role_id: number;
	email: string;
	auth_token: string;
	first_name: string;
	last_name: string;
	created_at: string;
	role: {
		role_id: number;
		title: string;
		alias: string
	}
}

export type IReduxUser = Omit<IUser, 'auth_token'>;
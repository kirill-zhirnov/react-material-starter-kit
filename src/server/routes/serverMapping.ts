import BasicController from '../controllers/basic';
import ApiUserController from '../controllers/api/user';

import {Request, Response} from 'express';
import ApiI18nController from '../controllers/api/i18n';
import AuthController from '../controllers/auth';

export interface IServerMappingItem {
	controller: TControllerClass;
	action?: string;
	method?: string[];
	//list of roles allowed to execute action
	allowedRoles?: string[];
}
export interface IServerMapping {
	[path: string]: IServerMappingItem
}

const mapping: IServerMapping = {
	'/api/user/login': {
		controller: ApiUserController,
		action: 'login',
		method: ['post']
	},
	'/api/user/logout': {
		controller: ApiUserController,
		action: 'logout',
		method: ['post']
	},
	'/api/i18n': {
		controller: ApiI18nController,
	},
	'/auth': {
		controller: AuthController
	}
};

export default mapping;

export type TControllerClass<C = BasicController> = new (req: Request, res: Response) => C;
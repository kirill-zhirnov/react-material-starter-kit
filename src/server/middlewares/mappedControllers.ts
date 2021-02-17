import {NextFunction, Request, Response} from 'express';
import routesMapping, {IServerMappingItem} from '../routes/serverMapping';
import BasicController from '../controllers/basic';
import _trim from 'lodash/trim';
import _camelCase from 'lodash/camelCase';
import _upperFirst from 'lodash/upperFirst';

export async function mappedControllersMiddleware(req: Request, res: Response, next: NextFunction) {
	const result = seekForController(req, res);

	if (result) {
		const {foundRoute, actionMethodName, controller} = result;

		try {
			await controller.executeAction(actionMethodName, foundRoute.allowedRoles);
		} catch (e) {
			console.error(`Error caught for route: ${req.path}, method: ${req.method}`, e);
			next(e);
		}
	} else {
		next();
	}
}

function seekForController(req: Request, res: Response): TSearchResult {
	const loweredPath = req.path.toLowerCase().replace(/\/$/, '');

	if (loweredPath in routesMapping && routesMapping[loweredPath].action) {
		const foundRoute = routesMapping[loweredPath];
		if (foundRoute.method && !foundRoute.method.includes(req.method.toLowerCase())) {
			return false;
		}

		const controller = new foundRoute.controller(req, res);
		const actionMethodName = foundRoute.action!;
		if (actionMethodName in controller) {
			return {
				foundRoute,
				controller,
				actionMethodName
			};
		} else {
			return false;
		}
	}

	return seekForGenericAction(req, res);
}

function seekForGenericAction(req: Request, res: Response): TSearchResult {
	const loweredPath = _trim(req.path.toLowerCase(), '/');
	const pathParts = loweredPath.split('/');
	const partsCount = pathParts.length;
	if (partsCount < 2)
		return false;

	const controllerPath = '/' + pathParts
		.filter((item,i) => i !== (partsCount - 1))
		.join('/')
	;

	if (!(controllerPath in routesMapping) || routesMapping[controllerPath].action)
		return false;

	const foundRoute = routesMapping[controllerPath];
	const action = _camelCase(pathParts[pathParts.length - 1]);
	const method = req.method.toLowerCase();

	const controller = new foundRoute.controller(req, res);

	for (const actionMethodName of [`${method}Action${_upperFirst(action)}`, `action${_upperFirst(action)}`]) {
		if (actionMethodName in controller) {
			return {
				foundRoute,
				controller,
				actionMethodName
			};
		}
	}

	return false;
}

type TSearchResult = false | {
	foundRoute: IServerMappingItem,
	controller: BasicController,
	actionMethodName: string
};
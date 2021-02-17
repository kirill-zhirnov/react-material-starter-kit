import {NextFunction, Request, Response} from 'express';
import ReactController from '../controllers/react';

export default async function reactSSRMiddleware(req: Request, res: Response, next: NextFunction) {
	const controller = new ReactController(req, res);
	const isSuccess = await controller.renderServerSide();

	if (!isSuccess) {
		next();
	}
}
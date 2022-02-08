import registry from 'simple-registry';
import express, {Application} from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import {RedisClient} from 'redis';

import {mappedControllersMiddleware} from '../middlewares/mappedControllers';
import reactSSRMiddleware from '../middlewares/reactServerSide';
import notFoundMiddleware from '../middlewares/notFound';

export class ExpressBaker {
	protected app: Application;
	protected rootPath: string;
	protected redisClient: RedisClient | undefined;

	constructor() {
		this.app = express();

		this.rootPath = registry.get('rootPath');
		this.redisClient = registry.has('redis') ? registry.get('redis') : undefined;
	}

	async make(): Promise<Application> {
		this.setupSession();
		this.setupViews();
		this.setupParsers();
		this.setupStatic();
		this.setupRoutes();

		return this.app;
	}

	async run(): Promise<void> {
		await this.make();

		const PORT: number = process.env.PORT as unknown as number || 3000;
		this.app.listen(PORT, () => console.log(`Worker started at: ${PORT}!`));
	}

	setupRoutes(): void {
		this.app.use(mappedControllersMiddleware);
		this.app.use(reactSSRMiddleware);
		this.app.use(notFoundMiddleware);
	}

	setupParsers(): void {
		const uploadLimit: string = '10mb';
		this.app.use(bodyParser.json({
			limit: uploadLimit
		}));
		this.app.use(bodyParser.urlencoded({
			extended: true,
			limit : uploadLimit,
			parameterLimit: 2000
		}));
		this.app.use(bodyParser.raw({
			limit: uploadLimit
		}));
		this.app.use(cookieParser(process.env.COOKIE_SECRET));
	}

	setupSession(): void {
		const REDIS_SESS_PREFIX: string = process.env.REDIS_SESS_PREFIX as unknown as string || 'sess:';
		const COOKIE_SECRET: string = process.env.COOKIE_SECRET as unknown as string;

		let redisStore = undefined;
		if (this.redisClient !== undefined) {
			const RedisStore = require('connect-redis')(expressSession);
			redisStore = new RedisStore({
					client: this.redisClient,
					prefix: REDIS_SESS_PREFIX
				})
			;
		}


		this.app.use(expressSession({
			store: redisStore,
			secret: COOKIE_SECRET,
			resave: false,
			saveUninitialized: true,
			cookie: {
				httpOnly: true,
				// secure: process.env.NODE_ENV === 'production'
			}
		}));
	}

	setupViews(): void {
		this.app.set('views', `${this.rootPath}/views`);
		this.app.set('view engine', 'pug');
	}

	setupStatic(): void {
		this.app.use(express.static(`${this.rootPath}/public`));
	}
}

export async function make(): Promise<Application> {
	const baker = new ExpressBaker();
	return baker.make();
}

export async function run(): Promise<void> {
	const baker = new ExpressBaker();
	return baker.run();
}
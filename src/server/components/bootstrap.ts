import registry from 'simple-registry';
import {createClient as redisCreateClient, RedisClient} from 'redis';
import fs from 'fs';

export class Bootstrap {
	constructor(public rootPath: string) {}

	async run(): Promise<void> {
		if (fs.existsSync(`${this.rootPath}/.env`)) {
			require('dotenv').config();
		}

		registry.set('rootPath', this.rootPath);
		registry.set('serverSideRendering', ['true', '1'].includes(process.env.SERVER_SIDE_RENDERING));

		this.setupRedis();
	}

	setupRedis(): void {
		const url = process.env.REDIS_URL;
		const redisClient: RedisClient = redisCreateClient({
			url
		});

		registry.set('redis', redisClient);
	}
}

export async function run(rootPath: string): Promise<void> {
	const bootstrap = new Bootstrap(rootPath);

	return await bootstrap.run();
}
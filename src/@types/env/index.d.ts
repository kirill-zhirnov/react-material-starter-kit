declare global {
	namespace NodeJS {
		interface ProcessEnv {
			SERVER_SIDE_RENDERING: string;
			REDIS_URL: string;
		}
	}
}

export {};
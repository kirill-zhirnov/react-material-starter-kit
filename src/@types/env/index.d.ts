declare global {
	namespace NodeJS {
		interface ProcessEnv {
			SERVER_SIDE_RENDERING: string;
			REDIS_URL: string;
			I18N_LANG: string;
		}
	}
}

export {};
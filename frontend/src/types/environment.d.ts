import {ENVIRONMENT} from "@/types/shared";

declare module globals {
	namespace NodeJS {
		interface ProcessEnv {
			VITE_API_URL: string;
			VITE_WS_URL: string;
			HOST: string;
			NODE_ENV: ENVIRONMENT;
		}
	}
}

export {};
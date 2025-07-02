import {ENVIRONMENT} from "../../types/shared";

export type Config = {
	nodeEnv: ENVIRONMENT;
	host: string;
	backend: {
		httpApiUrl: string;
		wsApiUrl: string;
	}
}

const config: Config = {
// @ts-ignore
	nodeEnv: process.env.NODE_ENV || ENVIRONMENT.DEVELOPMENT,
	host: process.env.HOST || '0.0.0.0',
	backend: {
		httpApiUrl: process.env.VITE_API_URL || 'http://localhost/api',
		wsApiUrl: process.env.VITE_WS_URL || 'ws://localhost/ws'
	}
} as const;

export default config;
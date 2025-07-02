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
	nodeEnv: import.meta.env.NODE_ENV || ENVIRONMENT.DEVELOPMENT,
	host: import.meta.env.VITE_HOST || '0.0.0.0',
	backend: {
		httpApiUrl: import.meta.env.VITE_API_URL || 'https://localhost/api',
		wsApiUrl: import.meta.env.VITE_WS_URL || 'wss://localhost/ws'
	}
} as const;

export default config;
import {Roaster, Api, WebSocketClient} from './lib';
import config from './config';

export function init() {
	const socket = new WebSocketClient({url: config.backend.wsApiUrl});
	const api = new Api({socket});

	globalThis.roaster = new Roaster({config, socket, api});
}
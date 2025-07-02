import {type Config} from "@/core/config";
import {WebSocketClient} from "./WsClient";
import {Api} from './Api';

namespace Roaster {
	export type Props = {
		config: Config;
		socket: WebSocketClient;
		api: Api
	}
}

export class Roaster {
	public readonly config: Config;
	public readonly socket: WebSocketClient;
	public readonly api: Api;

	constructor({config, api, socket}: Roaster.Props) {
		this.config = config;
		this.socket = socket;
		this.api = api;
	}
}
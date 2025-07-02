import {type IApi} from '@/types/api';
import {Promisified} from "./Promisified";
import {WebSocketClient} from "./WsClient.ts";

namespace Api {
	export type Props = {
		socket: WebSocketClient;
	}

	export type RequestData<
		ServiceName extends unknown = string,
		MethodName extends unknown = string,
		Params extends unknown = unknown,
	> = {
		service: ServiceName;
		method: MethodName;
		params: Params;
	}
}

export class Api<
	S extends keyof IApi = keyof IApi,
	M extends keyof IApi[S] = keyof IApi[S]
> extends Promisified<IApi[S][M]['result']> {
	private readonly socket: WebSocketClient;
	private readonly requestData: Partial<Api.RequestData> = {};

	public constructor({socket}: Api.Props) {
		super();
		this.socket = socket;
	}

	public service<T extends keyof IApi>(service: T) {
		this.requestData.service = service as string;

		return this as unknown as Api<T>;
	}

	public method<T extends keyof IApi[S]>(method: T) {
		this.requestData.method = method as string
		;
		return this as unknown as Api<S, T>;
	}

	public params(params: IApi[S][M]['params']) {
		this.requestData.params = params;
		return this;
	}

	protected execute(): Promise<IApi[S][M]['result']> {
		const requestData = JSON.stringify(this.requestData);

		return this.socket.send(requestData);
	}
}
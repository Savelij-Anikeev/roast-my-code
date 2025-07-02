namespace WebSocketClient {
	export type Props = {
		url: string;
	}
}

export class WebSocketClient {
	private readonly maxReconnectAttempts = 5;
	private readonly reconnectTimeout = 3000;
	private readonly url: string;
	private reconnectAttempts = 0;
	private ws: WebSocket;

	constructor({url}: WebSocketClient.Props) {
		this.url = url;
		this.ws = this.connect();
	}

	private connect(): WebSocket {
		const ws = new WebSocket(this.url);

		ws.onopen = () => {
			console.log('Connected to WebSocket');
			this.reconnectAttempts = 0;
		};

		ws.onclose = () => {
			console.log('WebSocket connection closed');
			this.reconnect();
		};

		ws.onerror = (error) => {
			console.error('WebSocket error:', error);
		};

		return ws;
	}

	private reconnect() {
		if (this.reconnectAttempts < this.maxReconnectAttempts) {
			this.reconnectAttempts++;
			setTimeout(() => {
				console.log(`Reconnecting... Attempt ${this.reconnectAttempts}`);
				this.ws = this.connect();
			}, this.reconnectTimeout);
		}
	}

	public send<Response = unknown>(data: any): Promise<Response> {
		return new Promise((resolve, reject) => {
			if (this.ws.readyState !== WebSocket.OPEN) {
				reject(new Error('WebSocket is not connected'));
				return;
			}

			const requestId = crypto.randomUUID();
			const message = { ...data, requestId };

			const handleMessage = (event: MessageEvent) => {
				const response = JSON.parse(event.data);
				if (response.requestId === requestId) {
					this.ws.removeEventListener('message', handleMessage);
					resolve(response.data);
				}
			};

			this.ws.addEventListener('message', handleMessage);
			this.ws.send(JSON.stringify(message));
		});
	}
}
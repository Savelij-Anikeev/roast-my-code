import {WebSocket} from 'ws';
import {RedisConnector} from "@/lib/classes";

namespace SocketManager {
	export type Props = {
		socket: WebSocket;
		redis: RedisConnector;
	}

	export type Message = {
		requestId: string;
		[key: string]: any;
	}

	export type Response<T = unknown> = {
		requestId: string;
		data: T;
	}

	export type ErrorResponse = {
		requestId: string;
		error: {
			message: string;
		}
	}
}

class SocketManager {
	private readonly socket: WebSocket;
	private readonly redis: RedisConnector;

	constructor({socket, redis}: SocketManager.Props) {
		this.socket = socket;
		this.redis = redis;

		this.initialize();
	}

	private initialize(): void {
		this.socket.on('message', this.handleMessage.bind(this));
		this.socket.on('close', this.handleClose.bind(this));
		this.socket.on('error', this.handleError.bind(this));
	}

	private async handleMessage(rawMessage: string): Promise<void> {
		try {
			const message = JSON.parse(rawMessage.toString()) as SocketManager.Message;
			const { requestId, ...payload } = message;

			const response = await this.processMessage(payload);
			this.sendResponse({
				requestId,
				data: response
			});
		} catch (error) {
			this.sendError({
				requestId: (JSON.parse(rawMessage.toString()) as SocketManager.Message).requestId,
				error: {
					message: error instanceof Error ? error.message : 'Internal server error'
				}
			});
		}
	}

	private async processMessage(payload: any): Promise<unknown> {
		switch (payload.type) {
			case 'ping':
				return { pong: true };
			default:
				throw new Error(`Unknown message type: ${payload.type}`);
		}
	}

	private sendResponse(response: SocketManager.Response): void {
		if (this.socket.readyState === WebSocket.OPEN) {
			this.socket.send(JSON.stringify(response));
		}
	}

	private sendError(error: SocketManager.ErrorResponse): void {
		if (this.socket.readyState === WebSocket.OPEN) {
			this.socket.send(JSON.stringify(error));
		}
	}

	private handleClose(): void {
		console.log('Client disconnected');
	}

	private handleError(error: Error): void {
		console.error('WebSocket error:', error);
	}
}

export default SocketManager;
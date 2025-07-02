import {createClient, RedisClientType} from "redis";
import {IConnector} from "@/lib/ifaces";
import config from '@/config';

class RedisConnector implements IConnector<RedisClientType> {
	private readonly client: RedisClientType;

	constructor() {
		const {
			REDIS: {
				USER, PASSWORD, HOST, PORT
			},
		} = config;
		this.client = createClient({
			url: `redis://${USER}:${PASSWORD}@${HOST}:${PORT}`,
		});
	}

	use() {
		return this.client;
	}

	initialize() {
		if (this.client) {
			this.client.connect();
		}
	}

	destroy() {
		if (this.client) {
			this.client.destroy();
		}
	}
}

export default RedisConnector;
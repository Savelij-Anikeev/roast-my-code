import {FastifyPluginCallback} from "fastify";
import {SocketManager} from '@/lib/classes';

const router: FastifyPluginCallback = (instance) => {
	instance.get('/ws', {websocket: true}, (socket) => {
		new SocketManager({
			redis: instance.redisConnector,
			socket
		});
	})
};

export default router;
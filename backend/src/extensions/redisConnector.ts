import {FastifyInstance} from "fastify";
import plugin from 'fastify-plugin';
import {RedisConnector} from '@/lib/classes';

export default plugin(async(fastify: FastifyInstance) => {
	const connector = new RedisConnector();

	fastify.decorate('redisConnector', connector);

	fastify.addHook('onClose', () => connector.destroy())
});
import {FastifyInstance} from "fastify";
import plugin from 'fastify-plugin';
import {PrismaConnector} from '@/lib/classes';

export default plugin(async(fastify: FastifyInstance) => {
	const connector = new PrismaConnector();

	fastify.decorate('prismaConnector', connector);

	fastify.addHook('onClose', async() => await connector.destroy())
});
import 'fastify';
import {PrismaConnector, RedisConnector} from "@/lib/classes";

declare module 'fastify' {
	interface FastifyInstance {
		redisConnector: RedisConnector;
		prismaConnector: PrismaConnector;
	}
}
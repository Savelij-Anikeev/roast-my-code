import fastify from "fastify";
import websocket from '@fastify/websocket';

import {
	wsRouter,
	commonRouter
} from './routers';
import {
	redisConnector,
	prismaConnector
} from '@/extensions';
import config from "./config";

const app = fastify();

app.register(websocket);

app.register(redisConnector);
app.register(prismaConnector);

app.register(wsRouter);
app.register(commonRouter);

app.listen({port: config.PORT}, () => {

});
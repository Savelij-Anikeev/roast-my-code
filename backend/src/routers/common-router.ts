import {FastifyPluginCallback} from "fastify";

import * as routes from './routes';

const router: FastifyPluginCallback = (instance) => {
	for (const route of Object.values(routes)) {
		instance.register(route, {prefix: '/api'});
	}
};

export default router;
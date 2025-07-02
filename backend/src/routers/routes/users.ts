import {FastifyPluginCallback} from "fastify";

const usersRouter: FastifyPluginCallback = (instance) => {
	instance.get('/users/getMany', () => {

	})
}

export default usersRouter;
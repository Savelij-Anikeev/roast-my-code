const config = {
	PORT: !isNaN(Number(process.env.PORT)) ? Number(process.env.PORT) : 3000,
	REDIS: {
		PORT: !isNaN(Number(process.env.REDIS_PORT)) ? Number(process.env.REDIS_PORT) : 6379,
		HOST: process.env.REDIS_HOST ?? 'redis',
		PASSWORD: process.env.REDIS_PASSWORD ?? 'password',
		USER: process.env.REDIS_USER ?? 'user'
	}
}

export default config;
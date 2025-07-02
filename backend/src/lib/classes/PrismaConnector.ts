import {PrismaClient} from "@prisma/client";
import {IConnector} from "@/lib/ifaces";

class PrismaConnector implements IConnector<PrismaClient> {
	private readonly client: PrismaClient

	constructor() {
		this.client = new PrismaClient();
	}

	use() {
		return this.client;
	}

	initialize() {
	}

	async destroy() {
		await this.client.$disconnect();
	}
}

export default PrismaConnector;
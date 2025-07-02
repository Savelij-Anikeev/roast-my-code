export interface IApi extends Record<string, Service> {
	'users': {
		'getUsers': {
			params: {ids: Array<number>};
			result: {id: number, name: string}[];
		}
	}
}

type Service = {
	[k: string]: {
		params: unknown;
		result: unknown;
	};
}
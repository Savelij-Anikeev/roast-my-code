export interface IConnector<T = unknown> {
	destroy(): void | Promise<void>;
	initialize(): void;
	use(): T
}
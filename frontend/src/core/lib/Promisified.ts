export abstract class Promisified<Returns extends unknown = unknown> {
	private promise?: Promise<Returns>;

	public then(
		onFulfilled: () => Returns,
		onRejected: () => unknown | void
	) {
		if (!this.promise) {
			this.initPromise();
		}

		return this.promise!.then(onFulfilled, onRejected);
	}

	public catch(onRejected: () => unknown | void) {
		if (!this.promise) {
			this.initPromise();
		}

		return this.promise!.catch(onRejected);
	}

	public finally(onFinally: () => unknown) {
		if (!this.promise) {
			this.initPromise();
		}

		return this.promise!.finally(onFinally);
	}

	private initPromise() {
		this.promise = Promise.resolve() as Promise<Returns>;
	}

	protected abstract execute(): Promise<Returns> | Returns;
}
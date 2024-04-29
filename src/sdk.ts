export class SDK {
	endpoint: string;

	id = 0;

	constructor(endpoint?: string) {
		const JSON_RPC_ENDPOINT_ENV_VAR = 'JSON_RPC_ENDPOINT';
		const JSON_RPC_ENDPOINT = process.env[JSON_RPC_ENDPOINT_ENV_VAR] || endpoint;

		if (!JSON_RPC_ENDPOINT) {
			throw new Error(`${JSON_RPC_ENDPOINT_ENV_VAR} environment variable is not set`);
		}

		this.endpoint = JSON_RPC_ENDPOINT;
	}

	public async request(method: string, params: object): Promise<unknown> {
		return fetch(this.endpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				jsonrpc: '2.0',
				method,
				params,
				id: (this.id += 1),
			}),
		}).then((response) => response.json());
	}
}

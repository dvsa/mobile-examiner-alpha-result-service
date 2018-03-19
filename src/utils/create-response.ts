import { IResponse } from "../interfaces/interface";

export default (body: any, statusCode = 200, reqHeaders: { [id: string]: string; } = {}): IResponse => {
	const accessControlAllowOriginHeader = {
		'Access-Control-Allow-Origin': '*' // Required for CORS support to work
	};

	return {
		statusCode,
		headers: { ...accessControlAllowOriginHeader, ...reqHeaders},
		body: (body === null)? null :JSON.stringify(body),
	};
};

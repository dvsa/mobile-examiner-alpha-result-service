import SimpleAuth from '../services/simpleAuth';
import NoAuth from '../services/noAuth';
import isDevEnv from '../utils/isDevEnv';

import { Context, Callback } from 'aws-lambda';
import { IAuth } from '../services/iauth';


export default (event, context: Context, callback: Callback) => {
	const token = event.authorizationToken;
	const authorizer = generateAuthorizer(token);

	if (authorizer.isTokenValid()) {
		const policyEffect = authorizer.getTokenEffect();
		const policy = generatePolicy(policyEffect, '*');
		const principalId = authorizer.getPrincipalId();
		const response = {
			principalId,
			policyDocument: policy,
		};
		callback(null, response);
	} else {
		callback(Error('Unauthorized'));
	}
};

function generateAuthorizer(token): IAuth {
	return isDevEnv() ? new SimpleAuth(token) : new NoAuth(token);
}

function generatePolicy(effect, resource): any {
	const statement = {
		Action: 'execute-api:Invoke',
		Effect: effect,
		Resource: resource
	};

	const policy: any = {
		Version:'2012-10-17',
		Statement: [statement]
	};
	
	return policy;
}

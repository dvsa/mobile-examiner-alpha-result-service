import { IAuth } from '../interfaces/iauth';
/* eslint class-methods-use-this: "off" */
/* eslint-env es6 */
// TODO, replace this with real authentication.

export default class SimpleAuth implements IAuth {
	constructor(private token) { }

	isTokenValid(): boolean {
		return this.token === 'allow' || this.token === 'deny';
	}

	getTokenEffect(): string {
		return (this.token === 'allow') ? 'Allow' : 'Deny';
	}

	getPrincipalId(): string {
		return 'Auth User';
	}
}

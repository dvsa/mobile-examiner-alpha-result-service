import { IAuth } from "../interfaces/iauth";

/* eslint class-methods-use-this: "off" */
/* eslint-env es6 */
// TODO, replace this with real authentication.

export default class NoAuth implements IAuth {
	constructor(private token) { }

	isTokenValid(): boolean {
		return true;
	}

	getTokenEffect(): string {
		return 'Allow';
	}

	getPrincipalId(): string {
		return 'Auth User';
	}
}

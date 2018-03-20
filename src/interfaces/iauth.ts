export interface IAuth {
	isTokenValid(): boolean
	getTokenEffect(): string
	getPrincipalId(): string
}
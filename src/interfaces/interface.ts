export interface ICompetency {
	id: string,
	faultsNo: number,
	isSerious: boolean,
	isDangerous: boolean
}

export interface ITestResult {
	id?: string,
	_candidateId: string,
	faults: ICompetency[]
}

export interface IResponse {
	body: any,
	statusCode: number,
	headers: { [id: string]: string; }
}
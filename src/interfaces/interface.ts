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
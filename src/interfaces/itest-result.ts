import { ICompetency } from "./icompetency";


export interface ITestResult {
	id?: string,
	_candidateId: string,
	faults: ICompetency[]
}


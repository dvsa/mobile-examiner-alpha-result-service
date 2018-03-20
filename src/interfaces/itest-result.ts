import { ICompetency } from "./icompetency";


export interface ITestResult {
	id?: string,
	candidateId: string,
	faults: ICompetency[]
}


export interface ICandidate {
	name: string,
	surname: string
}

export interface ICompetency {
	id: string,
	faultsNo: number,
	isSerious: boolean,
	isDangerous: boolean
}

export interface IDrivingTest {
	id?: string,
	candidate: ICandidate,
	pass: boolean,
	competencies: ICompetency[]
}
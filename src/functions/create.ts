import { doc } from 'serverless-dynamodb-client';
import { Context, Callback } from 'aws-lambda';

import { ITestResult } from '../interfaces/interface';
import { TestResultService } from '../services/testResult';

const testResultService = new TestResultService(doc, process.env.DYNAMODB_TABLE);

export default (event: any, context: Context, callback: Callback) => {
	let body: any;
	
	if (event.body && typeof (event.body) === 'object') {
		body = event.body
	} else {
		try {
			body = JSON.parse(event.body);
		} catch (e) {
			console.error(`Couldn\'t parse body ${e}`)
		}
	}

	const testResult: ITestResult = (({ _candidateId, faults }) => ({ _candidateId, faults }))(body);

	testResultService.create(testResult, callback);
};

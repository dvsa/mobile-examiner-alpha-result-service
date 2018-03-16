import { doc } from 'serverless-dynamodb-client';
import { Context, Callback } from 'aws-lambda';

import { ITestResult } from '../interfaces/interface';
import { TestResultService } from '../services/testResult';

const testResultService = new TestResultService(doc, process.env.DYNAMODB_TABLE);

export default (event: any, context: Context, callback: Callback) => {
	const data = JSON.parse(event.body);
	const testResult: ITestResult = (({ _candidateId, faults }) => ({ _candidateId, faults }))(data);

	testResultService.create(testResult, callback);
};

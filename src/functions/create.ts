import { doc } from 'serverless-dynamodb-client';
import { Context, Callback } from 'aws-lambda';

import { ITestResult } from '../interfaces/itest-result';
import TestResultService from '../services/test-result';

const testResultService = new TestResultService(doc, process.env.DYNAMODB_TABLE);

export default (event: any, context: Context, callback: Callback) => {
	testResultService.create(event.body, callback);
};

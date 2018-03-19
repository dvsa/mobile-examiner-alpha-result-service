import { doc } from 'serverless-dynamodb-client';
import { Context, Callback } from 'aws-lambda';

import TestResultService from './../services/test-result';

const testResultService = new TestResultService(doc, process.env.DYNAMODB_TABLE);

export default (event, context: Context, callback: Callback) => {
	testResultService.list(callback);
};

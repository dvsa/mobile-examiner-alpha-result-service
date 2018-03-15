import { doc } from 'serverless-dynamodb-client';
import { Context, Callback } from 'aws-lambda';

import DrivingTests from '../services/driving-tests';

const drivingTests = new DrivingTests(doc, process.env.DYNAMODB_TABLE);

export default (event, context: Context, callback: Callback) => {
	drivingTests.list(callback);
};

import { doc } from 'serverless-dynamodb-client';
import { Context, Callback } from 'aws-lambda';

import { IDrivingTest } from '../interfaces/interface';
import DrivingTests from '../services/driving-tests';

const drivingTest = new DrivingTests(doc, process.env.DYNAMODB_TABLE);

export default (event: any, context: Context, callback: Callback) => {
	const data = JSON.parse(event.body);
	const drivingTestData: IDrivingTest = (({ candidate, pass, competencies }) => ({ candidate, pass, competencies }))(data);

	drivingTest.create(drivingTestData, callback);
};

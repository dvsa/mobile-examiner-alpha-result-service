import { doc } from 'serverless-dynamodb-client';
import DrivingTests from '../services/driving-tests';

const drivingTests = new DrivingTests(doc, process.env.DYNAMODB_TABLE);

export default (event, context, callback) => {
	drivingTests.list(callback);
};

import { doc } from 'serverless-dynamodb-client';
import DrivingTests from '../services/driving-tests';

const drivingTest = new DrivingTests(doc, process.env.DYNAMODB_TABLE);

export default (event, context, callback) => {
	const data = JSON.parse(event.body);
	const drivingTestData = (({ candidate, pass, competencies }) => ({ candidate, pass, competencies }))(data);
	drivingTest.create(drivingTestData, callback);
};

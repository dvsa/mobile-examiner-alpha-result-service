import { uuid } from 'uuid';
import createResponse from '../utils/createResponse';
import { DynamoDB, AWSError } from 'aws-sdk';

export default class DrivingTests {

	constructor(private db: DynamoDB.DocumentClient, private tableName: string) { }

	list(callback) {
		let message: string;
		let response;
		let error;

		const params: DynamoDB.DocumentClient.ScanInput = { TableName: this.tableName };

		console.log('Scanning DrivingTests Table..');

		this.db.scan(params, (err: AWSError, data: DynamoDB.ScanOutput) => {
			if (err) {
				message = 'Error!';
				error = createResponse({
					body: {
						message,
						err,
					},
					statusCode: 500,
				});
				callback(error);
			} else {
				message = 'Success!';
				response = createResponse({
					body: {
						message,
						drivingTests: data.Items,
					},
				});
				callback(null, response);
			}
		})
	}

	get(id, callback) {
		let message;
		let error;
		let response;

		const params = {
			TableName: this.tableName,
			Key: {
				id
			},
		};

		this.db.get(params, (err, data) => {

			if (err) {
				message = 'Error!';
				error = createResponse({
					body: {
						message,
						err,
					},
					statusCode: 500,
				});
				callback(error);
			} else {
				const user = data.Item;
				message = 'Success!';
				response = createResponse({
					body: {
						message,
						user,
					},
				});
				callback(null, response);
			}
		});

	}

	create(drivingTestsData, callback) {
		let message;
		let error;
		let response;

		// if (typeof name !== 'string' || typeof role !== 'string') {
		// 	console.error('Validation Failed');
		// 	error = createResponse({
		// 		body: 'Couldn\'t create the user.',
		// 		statusCode: 400,
		// 	});
		// 	callback(error);
		// }

		const params = {
			TableName: this.tableName,
			Item: { ...drivingTestsData, id: uuid.v1() }
		};

		// write the user to the database
		this.db.put(params, (err) => {
			// handle potential errors
			if (err) {
				message = 'Error!';
				console.error(error);
				error = createResponse({
					body: {
						message,
						err,
					},
					statusCode: 500,
				});
				callback(error);
			} else {
				message = 'Success!';
				// create a response
				response = createResponse({
					body: {
						message,
						user: params.Item,
					},
				});
				callback(null, response);
			}
		});
	}
}
import { Callback } from 'aws-lambda';
import createResponse from '../utils/createResponse';
import { DynamoDB, AWSError } from 'aws-sdk';
import * as UUID from 'uuid'
import { ITestResult } from '../interfaces/interface';

export class TestResultService {

	constructor(private db: DynamoDB.DocumentClient, private tableName: string) { }

	list(callback: Callback) {
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

	create(drivingTestsData: ITestResult, callback:Callback) {
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

		const id = UUID.v1()
		const params = {
			TableName: this.tableName,
			Item: { ...drivingTestsData, id  }
		};

		// write the user to the database
		this.db.put(params, (err) => {
			// handle potential errors
			if (err) {
				message = 'Error!';
				console.error(err);
				error = createResponse({
					body: {
						message,
						err,
					},
					statusCode: 500,
				});
				callback(error);
			} else {
				const response = {
					statusCode: 201,
					headers: {
						'Access-Control-Allow-Origin': '*', // Required for CORS support to work
						'Location': `/test-result/${id}`
					},
				};

				callback(null, response);
			}
		});
	}
}
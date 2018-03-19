import { Callback } from 'aws-lambda';
import createResponse from '../utils/createResponse';
import { DynamoDB, AWSError } from 'aws-sdk';
import * as UUID from 'uuid'
import { ITestResult, IResponse } from '../interfaces/interface';

export default class TestResultService {

	constructor(private db: DynamoDB.DocumentClient, private tableName: string) { 
		console.log('hej');
	}

	list(callback: Callback) {
		let message: string;
		let response;
		let error;

		const params: DynamoDB.DocumentClient.ScanInput = { TableName: this.tableName };

		console.log('Scanning testResultTable...');

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

	create(requestBody: any, callback: Callback) {
		const testResultData: ITestResult = this.extractTestResult(requestBody);
		const validationErrorResponse = this.validateTestResult(testResultData);

		if (validationErrorResponse) {
			return callback(null, validationErrorResponse)
		}

		const id = UUID.v1()
		const params = {
			TableName: this.tableName,
			Item: { ...testResultData, id }
		};

		this.db.put(params, (err: AWSError) => {
			if (err) {
				const error = createResponse({
					body: {
						message: 'Error!',
						err,
					},
					statusCode: 500,
				});

				callback(null, error);
			} else {
				const statusCode = 201;
				const headers = {
					'Location': `/test-result/${id}`,
					'Access-Control-Expose-Headers': 'Location'
				}

				callback(null, createResponse(null, statusCode, headers));
			}
		});
	}

	private validateTestResult(testResultData: ITestResult): IResponse | null {
		if (!testResultData._candidateId || typeof (testResultData._candidateId) !== 'string') {
			return this.createMissingPropertyError('_candidateId')
		} else if (!testResultData.faults || typeof (testResultData.faults) !== 'object') {
			return this.createMissingPropertyError('faults')
		}

		return null;
	}

	private createMissingPropertyError(propertyName): IResponse {
		return createResponse({
			title: 'Error',
			message: `${propertyName} property is missing`,
		}, 400);
	}

	private extractTestResult(object: any): ITestResult {
		let body: any;

		if (object && typeof (object) === 'object') {
			body = object
		} else {
			try {
				body = JSON.parse(object);
			} catch (e) {
				console.error(`Couldn\'t parse body ${e}`)
			}
		}

		return (({ _candidateId, faults }) => ({ _candidateId, faults }))(body);
	}
}
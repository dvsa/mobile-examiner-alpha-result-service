import { ITestResult } from '../interfaces/itest-result';
import { Callback } from 'aws-lambda';
import createResponse from '../utils/create-response';
import { DynamoDB, AWSError } from 'aws-sdk';
import * as UUID from 'uuid'
import { IResponse } from '../interfaces/iresponse';

export default class TestResultService {

	constructor(private db: DynamoDB.DocumentClient, private tableName: string) { }
	
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
					message: 'Error!',
					error: err
				}, 500);

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
		if (!testResultData.candidateId || typeof (testResultData.candidateId) !== 'string') {
			return this.createMissingPropertyError('candidateId')
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

		const { candidateId, faults } = body;
		return {
			candidateId,
			faults
		}
	}
}
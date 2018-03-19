import { IResponse } from './../interfaces/interface';
import TestResultService from "./test-result";
import { DynamoDB } from "aws-sdk";

jest.mock('aws-sdk');

const mockTableName = 'MockTableName'
const mockDBWithPutSuccess = jest.fn<DynamoDB.DocumentClient>(() => ({
	put: jest.fn((params, closure) => closure(null)),
}))();
const mockDBWithPutFailure = jest.fn<DynamoDB.DocumentClient>(() => ({
	put: jest.fn((param, closure) => closure({})),
}))();
const validTestResult = {
	_candidateId: "some candidate Id",
	faults: []
}

let testResultService: TestResultService;

describe('TestResultService', () => {
	describe('create', () => {
		beforeEach(() => {
			testResultService = new TestResultService(mockDBWithPutSuccess, mockTableName)
		})

		describe('when event.body was an stringify obj', () => {
			it('should correctly parse it into obj', () => {
				testResultService.create(JSON.stringify(validTestResult), (err, result: IResponse) => {
					expect(err).toBe(null)
					expect(result.statusCode).toBe(201)
				})
			})
		})

		describe('when _candidateId is missing', () => {
			it('should return 400 with error msg', () => {
				testResultService.create({}, (error, result: IResponse) => {
					const body = JSON.parse(result.body)
					expect(body.message).toContain('_candidateId property is missing');
					expect(result.statusCode).toBe(400);
					expect(result.headers).toEqual({ "Access-Control-Allow-Origin": "*" })
				})
			})
		})

		describe('when faults is missing', () => {
			it('should return 400 with error msg', () => {
				testResultService.create({ _candidateId: '123' }, (error, result: IResponse) => {
					const body = JSON.parse(result.body)
					expect(body.message).toContain('faults property is missing');
					expect(result.statusCode).toBe(400);
					expect(result.headers).toEqual({ "Access-Control-Allow-Origin": "*" })
				})
			})
		})

		describe('when pass validation', () => {
			it('should pass proper object to db.put', () => {
				testResultService.create(validTestResult, (error, result: IResponse) => { })

				const paramsPassedToDB = mockDBWithPutSuccess.put.mock.calls[0][0]
				expect(paramsPassedToDB.TableName).toBe(mockTableName)
				expect(paramsPassedToDB.Item._candidateId).toBe(validTestResult._candidateId)
				expect(paramsPassedToDB.Item.faults).toEqual(validTestResult.faults)
				expect(paramsPassedToDB.Item.id).toBeDefined()
			})
		})

		describe('when db.put returns error', () => {
			it('should call callback with error response', () => {
				const expectedErrorResponse: IResponse = {
					body: "{\"message\":\"Error!\",\"error\":{}}",
					headers: { "Access-Control-Allow-Origin": "*" },
					statusCode: 500
				}

				const testResultService = new TestResultService(mockDBWithPutFailure, mockTableName)
				testResultService.create(validTestResult, (err, result: IResponse) => {
					expect(result).toEqual(expectedErrorResponse)
				})
			})
		})

		describe('when db.put succeeded', () => {
			it('should call callback with location header', () => {
				testResultService.create(validTestResult, (err, result: IResponse) => {
					expect(result.body).toEqual(null)
					expect(result.headers["Access-Control-Allow-Origin"]).toEqual("*")
					expect(result.headers["Location"]).toContain("/test-result/")
					expect(result.statusCode).toEqual(201)
				})
			})
		})
	})
})
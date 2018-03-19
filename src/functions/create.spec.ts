import create from './create';
import TestResultService from '../services/test-result';

jest.mock('../services/test-result')

describe('create handler', () => {
    it('should pass event.body to test result service', () => {
        const expectedBody = { test: 'test' }
        let event = { body: expectedBody };

        create(event, null, () => {})

        const createdInstances = TestResultService.mock.instances;
        const createdInstance = createdInstances[0].create;

        expect(createdInstances.length).toBe(1)
        expect(createdInstance.mock.calls[0][0]).toBe(expectedBody)
    })
})
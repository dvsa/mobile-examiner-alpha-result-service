import uuid from 'uuid';

import createResponse from '../utils/createResponse';

export default class DrivingTests {

	constructor(db, tableName) {
		this.db = db;
		this.tableName = tableName;
	}

	list(callback) {

		let message;
		let response;
		let error;

		const params = {
			TableName: this.tableName,
		};

		console.log('Scanning DrivingTests Table..');

		this.db.scan(params, onScan);

		function onScan(err, data) {
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
				const drivingTests = data.Items;
				// return drivingTests
				response = createResponse({
					body: {
						message,
						drivingTests,
					},
				});
				callback(null, response);
			}
		}
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

		const id = {
			id: uuid.v1()
		};
		Object.assign(drivingTestsData, id);

		console.log('Prepared DT: ' + JSON.stringify(drivingTestsData));

		const params = {
			TableName: this.tableName,
			Item: drivingTestsData
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
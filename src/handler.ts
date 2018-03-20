import auth from './functions/auth';
import create from './functions/create';

const handler = {
	auth,
	create,
};

exports.default = handler;
module.exports = exports['default'];
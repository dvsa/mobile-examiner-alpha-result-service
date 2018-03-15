import auth from './functions/auth';
import list from './functions/list';
import create from './functions/create';

const handler = {
	auth,
	list,
	create,
};

exports.default = handler;
module.exports = exports['default'];
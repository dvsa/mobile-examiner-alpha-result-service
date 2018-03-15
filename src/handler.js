import auth from './functions/auth';
import list from './functions/list';
import create from './functions/create';

const handler = {
	auth,
	list,
	create,
};

export default handler;

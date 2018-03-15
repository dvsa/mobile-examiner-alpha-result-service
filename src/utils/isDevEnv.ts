export default (): boolean => {
	return process.env.ENV === 'DEV';
};

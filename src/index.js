import fs from 'fs';
import flatry from 'flatry';

const methods = [
	path => require(path),
	path => JSON.parse(fs.readFileSync(path, 'utf-8'))
];

export default path => new Promise((resolve, reject) => {
	let err;
	let res;
	methods.some(method => {
		[err, res] = flatry(() => method(path));
		return res;
	});

	if (err) {
		reject(err);
	}

	resolve(res);
});

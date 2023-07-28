export function getObjectLength(params: object) {
	const paramsKey = Object.keys(params);

	const totalParams = [];

	for (let i = 0; i < paramsKey.length; i++) {
		const key = paramsKey[i];

		if (key) {
			totalParams.push(key);
		}
	}

	return totalParams.length;
}

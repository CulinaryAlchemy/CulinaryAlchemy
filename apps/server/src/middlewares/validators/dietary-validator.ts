import { body } from 'express-validator';

function validateTypeofInArray(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	value: any
) {
	console.log('valueee: ', value);
	const validType = 'string';
	// we receive a param name, and extract the param nae in the request
	const paramArray = value;

	for (let index = 0; index < paramArray.length; index++) {
		const item = paramArray[index];
		if (typeof item !== validType) {
			throw new Error(`The item at index ${index} is not of type ${validType}`);
		}
	}
	return true;
}

export const validateDietary = [
	body('dietary').optional().isArray().custom(validateTypeofInArray),
];

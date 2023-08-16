import { param } from 'express-validator';

const isInt = (value: string) => {
	// check if the value can be converted to an integer
	const parsedValue = parseInt(value, 10);
	if (isNaN(parsedValue)) {
		return false;
	}

	// check if it is an entire numebr
	if (Math.floor(parsedValue) !== parsedValue) {
		return false;
	}

	// check if it is positive
	if (parsedValue <= 0) {
		return false;
	}

	return true;
};
export const idValidator = [param('id').notEmpty().custom(isInt)];
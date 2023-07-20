import { ValidationChain } from 'express-validator';
import { emailValidator, passwordValidation } from '.';
export const validateSignIpInput: ValidationChain[] = [
	...emailValidator, // email
	...passwordValidation,
];

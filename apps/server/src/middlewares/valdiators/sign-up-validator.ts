import { ValidationChain } from 'express-validator';
import { emailValidator, usernameValidator, passwordValidation } from '.';

export const validateSignUpInput: ValidationChain[] = [
	...emailValidator, // email
	...passwordValidation, // password
	...usernameValidator, // username
];

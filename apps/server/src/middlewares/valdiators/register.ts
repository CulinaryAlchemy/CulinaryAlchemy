import { body, ValidationChain } from 'express-validator';
import { emailValidator } from '.';
export const validateRegisterInput: ValidationChain[] = [
	body('username').notEmpty().withMessage('Username cant be empty'), // username
	body('username').isString().withMessage('Username must be string'),
	...emailValidator, // email
	body('password').notEmpty().withMessage('Password cant be empty'), // password
	body('password').isString().withMessage('password must be string'),
];

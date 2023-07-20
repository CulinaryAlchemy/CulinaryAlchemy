import { body, ValidationChain } from 'express-validator';

export const passwordValidation: ValidationChain[] = [
	body('password').notEmpty().withMessage('Password cant be empty'),
	body('password').isString().withMessage('password must be string'),
];

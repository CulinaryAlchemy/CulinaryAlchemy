import { body, ValidationChain } from 'express-validator';

export const usernameValidator: ValidationChain[] = [
	body('username').notEmpty().withMessage('Username cant be empty'),
	body('username').isString().withMessage('Username must be string'),
];

import express from 'express';
import { body } from 'express-validator';

import { signUp } from './sign-up';
import { signIn } from './sign-in';
import {
	validateValidationChainResult,
	emailValidator,
} from '../../middlewares/validators';

const authRouter = express.Router();

authRouter.post(
	'/sign-up',
	body('username').notEmpty().isString(),
	emailValidator,
	body('password').notEmpty().isString(),
	validateValidationChainResult,
	signUp
);
authRouter.post(
	'/sign-in',
	emailValidator,
	body('password').notEmpty().isString(),
	validateValidationChainResult,
	signIn
);

export { authRouter };

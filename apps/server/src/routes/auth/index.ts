import express from 'express';
import { signUp } from './sign-up';
import { signIn } from './sign-in';
import {
	validateValidationChainResult,
	emailValidator,
} from '../../middlewares/validators';
import { body } from 'express-validator';

const authRouter = express.Router();

authRouter.post(
	'/register',
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

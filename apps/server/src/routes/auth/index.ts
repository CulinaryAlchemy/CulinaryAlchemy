import express from 'express';
import { body } from 'express-validator';

import { signUp } from '../../controllers/auth/sign-up';
import { signIn } from '../../controllers/auth/sign-in';
import {
	validateValidationChainResult,
	validateEmail,
} from '../../middlewares/validators';

const authRouter = express.Router();

authRouter.post(
	'/sign-up',
	body('username').notEmpty().isString().isLowercase(),
	body('email').notEmpty().isString().isEmail().custom(validateEmail),
	body('password').notEmpty().isString(),
	validateValidationChainResult,
	signUp
);
authRouter.post(
	'/sign-in',
	body('email').notEmpty().isString().isEmail().custom(validateEmail),
	body('password').notEmpty().isString(),
	validateValidationChainResult,
	signIn
);

export { authRouter };

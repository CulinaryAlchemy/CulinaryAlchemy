import express from 'express';
import { signUp } from './sign-up';
import { signIn } from './sign-in';
import {
	validateSignIpInput,
	validateValidationChainResult,
	validateSignUpInput,
} from '../../middlewares/valdiators';

const authRouter = express.Router();

authRouter.post(
	'/register',
	validateSignUpInput,
	validateValidationChainResult,
	signUp
);
authRouter.post(
	'/sign-in',
	validateSignIpInput,
	validateValidationChainResult,
	signIn
);

export { authRouter };

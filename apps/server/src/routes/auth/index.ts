import express from 'express';
import { signUp } from './sign-up';
import { signIn } from './sign-in';
import { emailValidator, validateValidationChainResult, validateSignUpInput } from '../../middlewares/valdiators';

const authRouter = express.Router();

authRouter.post(
	'/register',
	validateSignUpInput,
	validateValidationChainResult,
	signUp
);
authRouter.post(
	'/sign-in',
	emailValidator,
	validateValidationChainResult,
	signIn
);

export { authRouter };

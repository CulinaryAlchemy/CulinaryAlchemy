import express from 'express';
import { register } from './register';
import { signIn } from './sign-in';
import { emailValidator, validateRegisterInput } from '../../middlewares/valdiators';

import { validateValidationChainResult } from '../../middlewares/valdiators';

const authRouter = express.Router();

authRouter.post('/register', validateRegisterInput, register);
authRouter.post('/sign-in', emailValidator, validateValidationChainResult, signIn);

export { authRouter };

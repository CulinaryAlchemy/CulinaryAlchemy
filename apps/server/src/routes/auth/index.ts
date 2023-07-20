import express from 'express';
import { register } from './register';
import { signIn } from './sign-in';
import { emailValidator } from '../../middlewares/valdiators';

const authRouter = express.Router();

authRouter.post('/register', emailValidator, register);
authRouter.post('/sign-in', emailValidator, signIn);

export { authRouter };

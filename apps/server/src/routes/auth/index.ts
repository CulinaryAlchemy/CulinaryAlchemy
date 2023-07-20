import express from "express";
import { register } from "./register";
import { signIn } from "./sign-in";
import { emailValidator } from "../../middlewares/valdiators";

const authRouter = express.Router();

authRouter.post('/register', validateRegisterInput, validateValidationChainResult, register);
authRouter.post('/sign-in', emailValidator, validateValidationChainResult, signIn);

export { authRouter };
import express from "express";
import { register } from "./register";
import { signIn } from "./sign-in";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/sign-in", signIn);

export { authRouter };

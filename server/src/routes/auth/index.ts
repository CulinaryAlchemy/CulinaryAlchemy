import express from "express";
import { register } from "./register";

const authRouter = express.Router();

authRouter.post("/register", register);

export { authRouter };

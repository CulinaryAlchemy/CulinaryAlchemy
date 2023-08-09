import express from "express";
import { userRouter } from "./user";
import { authRouter } from "./auth";
import { roleRouter } from "./roles";

export const appRouter = express.Router()

appRouter.use('/auth', authRouter);
appRouter.use('/user', userRouter);
appRouter.use('/role', roleRouter)
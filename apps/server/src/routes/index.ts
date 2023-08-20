import express from 'express';

import { userRouter } from './user';
import { authRouter } from './auth';
import { roleRouter } from './roles';
import { healthRouter } from './health';
import { dietaryRouter } from './dietary';

const appRouter = express.Router();

appRouter.use('/auth', authRouter);
appRouter.use('/user', userRouter);
appRouter.use('/role', roleRouter);
appRouter.use('/health', healthRouter);
appRouter.use('/dietary', dietaryRouter);

export { appRouter };

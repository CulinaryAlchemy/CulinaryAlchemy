import express from 'express';
import { Controllers } from '../../controllers';

export const healthRouter = express.Router();

healthRouter.get('/live', Controllers.Health.get);

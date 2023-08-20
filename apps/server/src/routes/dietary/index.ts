import express from 'express';
import { Controllers } from '../../controllers';

const dietaryRouter = express.Router();

dietaryRouter.get('/all', Controllers.Dietary.get.all);
dietaryRouter.get('/:id', Controllers.Dietary.get.byId);

export { dietaryRouter };

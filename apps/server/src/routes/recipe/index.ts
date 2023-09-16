import express from 'express';
import { recipeController } from '../../controllers/recipe';

const recipeRouter = express.Router();

recipeRouter.post('/', recipeController.post);

export { recipeRouter };

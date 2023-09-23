import { Controllers } from '../../controllers';
import express from 'express';
import { body, query } from 'express-validator';
import {
	idValidator,
	validateValidationChainResult,
} from '../../middlewares/validators';
import { passportMiddleware } from '../../middlewares/auth/passport-jwt-strategy';
import { authMiddleware } from '../../middlewares';
import { upload } from '../../config';
import { recipeImage } from '../../middlewares/image/recipe';

const recipeRouter = express.Router();
recipeRouter.get(
	'/all',
	query('limit').optional().isInt({ min: 1, max: 10 }),
	query('offset').optional().isInt({ min: 1, max: 10 }),
	validateValidationChainResult,
	Controllers.recipeController.get.all
);
recipeRouter.get(
	'/:id',
	idValidator,
	validateValidationChainResult,
	Controllers.recipeController.get.byId
);

recipeRouter.post(
	'/:id', // the user id
	idValidator,
	passportMiddleware,
	authMiddleware,
	upload.fields([
		{ name: 'image_1', maxCount: 1 },
		{ name: 'image_1_blur', maxCount: 1 },
		{ name: 'image_2', maxCount: 1 },
		{ name: 'image_2_blur', maxCount: 1 },
		{ name: 'image_3', maxCount: 1 },
		{ name: 'image_3_blur', maxCount: 1 },
	]),
	recipeImage,
	body('title').notEmpty().isString().isLength({ min: 3, max: 70 }),
	body('description').optional().isString().isLength({ max: 255 }),
	body('cooking_time').optional().notEmpty().isInt({ min: 0, max: 180 }),
	body('equipment_needed').optional().notEmpty().isArray({ min: 1, max: 12 }),
	body('ingredients').notEmpty().isArray({ min: 1, max: 20 }),
	body('servings').optional().notEmpty().isInt({ min: 1, max: 100 }),
	body('steps').notEmpty().isArray({ min: 2, max: 30 }),
	body('authors_notes').optional().isString().isLength({ min: 20, max: 255 }),
	body('spices').optional().isArray({ min: 1, max: 10 }),
	body('youtube_link')
		.optional()
		.isString()
		.custom((value) => value.startsWith('https://www.youtube.com/watch?v=')),
	validateValidationChainResult,
	Controllers.recipeController.post
);

recipeRouter.delete(
	'/:id',
	idValidator,
	validateValidationChainResult,
	Controllers.recipeController.remove
);
export { recipeRouter };

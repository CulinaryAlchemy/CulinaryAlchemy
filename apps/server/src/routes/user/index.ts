import express from 'express';
import { passportMiddleware } from '../../middlewares/auth/passport-jwt-strategy';
import { body, param, query } from 'express-validator';

// controllers
import { Controllers } from '../../controllers';
// validators
import { idValidator } from '../../middlewares/validators';
import { authMiddleware } from '../../middlewares';
import {
	validateValidationChainResult,
	validateEmailDomain,
} from '../../middlewares/validators';
import { upload } from '../../config/multer';
import { validateDietary } from '../../middlewares/validators/dietary-validator';

export const userRouter = express.Router();

// user
userRouter.get(
	'/all',
	query('limit').optional().isInt({ min: 1, max: 10 }),
	validateValidationChainResult,
	Controllers.User.get.all
);
userRouter.get(
	'/:id',
	idValidator,
	validateValidationChainResult,
	Controllers.User.get.byId
);

userRouter.get('/profile/:username', Controllers.User.get.byUsername);

userRouter.get(
	'/check-username/:username',
	Controllers.User.checkIfAvailable.username
);
userRouter.get(
	'/check-email/:email',
	param('email').notEmpty().isString().isEmail().custom(validateEmailDomain),
	validateValidationChainResult,
	Controllers.User.checkIfAvailable.email
);

userRouter.put(
	'/:id',
	passportMiddleware,
	authMiddleware,
	idValidator,
	body('name').optional().notEmpty().isString().isLowercase(),
	body('password').optional().notEmpty().isString(),
	body('location').optional().notEmpty().isString(),
	body('description').optional().notEmpty().isString(),
	body('email').optional().isEmail().notEmpty(),
	validateValidationChainResult,
	upload.single('avatar'),
	Controllers.User.put.byId
);

userRouter.delete(
	'/:id',
	idValidator,
	passportMiddleware,
	authMiddleware,
	validateValidationChainResult,
	Controllers.User.delete.ById
);

// user dietaries
userRouter.post(
	'/:id/dietary',
	passportMiddleware,
	authMiddleware,
	body('dietaryId').notEmpty().isInt(),
	param('id').notEmpty().isInt(),
	validateDietary,
	validateValidationChainResult,
	Controllers.User.manageDietary.add
);
userRouter.delete(
	'/:id/dietary',
	passportMiddleware,
	authMiddleware,
	body('dietaryId').notEmpty().isInt(),
	param('id').notEmpty().isInt(),
	validateDietary,
	validateValidationChainResult,
	Controllers.User.manageDietary.remove
);

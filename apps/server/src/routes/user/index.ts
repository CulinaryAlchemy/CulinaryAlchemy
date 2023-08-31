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
	validateEmail,
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
userRouter.post(
	'/check-username',
	body('username')
		.notEmpty()
		.isString()
		.isLowercase()
		.isLength({ min: 1, max: 15 }),
	validateValidationChainResult,
	Controllers.User.checkIfAvailable.username
);
userRouter.post(
	'/check-email',
	body('email').notEmpty().isString().isEmail().custom(validateEmail),
	validateValidationChainResult,
	Controllers.User.checkIfAvailable.email
);
userRouter.get(
	'/:id',
	idValidator,
	validateValidationChainResult,
	Controllers.User.get.byId
);

userRouter.get(
	'/profile/:username',
	param('username')
		.notEmpty()
		.isString()
		.isLowercase()
		.isLength({ min: 1, max: 15 }),
	validateValidationChainResult,
	Controllers.User.get.byUsername
);

userRouter.put(
	'/:id',
	passportMiddleware,
	authMiddleware,
	idValidator,
	upload.fields([
		{ name: 'avatar', maxCount: 1 },
		{ name: 'avatarBlur', maxCount: 1 },
		{ name: 'header', maxCount: 1 },
		{ name: 'headerBlur', maxCount: 1 },
	]),
	body('username')
		.notEmpty()
		.isString()
		.isLowercase()
		.isLength({ min: 1, max: 15 }),
	body('name')
		.optional()
		.notEmpty()
		.isString()
		.isLowercase()
		.isLength({ min: 1, max: 30 }),
	body('password')
		.optional()
		.notEmpty()
		.isString()
		.isLength({ min: 12, max: 60 }),
	body('location')
		.optional()
		.notEmpty()
		.isString()
		.isLength({ min: 1, max: 30 }),
	body('description')
		.optional()
		.notEmpty()
		.isString()
		.isLength({ min: 1, max: 150 }),
	body('email')
		.optional()
		.isEmail()
		.notEmpty()
		.custom(validateEmail)
		.isLength({ min: 4, max: 320 }),
	validateValidationChainResult,
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
	'/:id/dietary', // the :id param is the user id
	passportMiddleware,
	authMiddleware,
	idValidator, // the :id param is the user id
	validateDietary, // dietary validator
	validateValidationChainResult,
	Controllers.User.manageDietary.add
);
userRouter.delete(
	'/:id/dietary', // the :id param is the user id
	passportMiddleware,
	authMiddleware,
	idValidator, // the :id param is the user id
	validateDietary, // dietary validator
	validateValidationChainResult,
	Controllers.User.manageDietary.remove
);

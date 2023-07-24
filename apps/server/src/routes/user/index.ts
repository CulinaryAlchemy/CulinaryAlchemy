import express from 'express';
import passport from '../../services/auth';
import { body, param } from 'express-validator';
// providers
import { getById, getByUsername, getAll } from './get';
import { putById } from './put';
import { deleteById } from './delete';

// validators
import { idValidator, isInt } from '../../middlewares/validators';
import { authMiddleware } from '../../middlewares';
import {
	validateValidationChainResult,
	emailValidator,
} from '../../middlewares/validators';
export const userRouter = express.Router();

const passportMiddleware = passport.authenticate('jwt', { session: false });

// get
userRouter.get('/id/:id', idValidator, validateValidationChainResult, getById);

userRouter.get('/username/:username', getByUsername);

userRouter.get('/all/:limit',param('limit').custom(isInt), validateValidationChainResult, getAll);

// put
userRouter.put(
	'/id/:id',
	passportMiddleware,
	authMiddleware,
	idValidator,
	body('name').optional().notEmpty().isString(),
	emailValidator,
	body('password').optional().notEmpty().isString(),
	body('location').optional().notEmpty().isString(),
	body('description').optional().notEmpty().isString(),
	validateValidationChainResult,
	putById
);

// delete
userRouter.delete(
	'/id/:id',
	idValidator,
	validateValidationChainResult,
	passportMiddleware,
	authMiddleware,
	deleteById
);

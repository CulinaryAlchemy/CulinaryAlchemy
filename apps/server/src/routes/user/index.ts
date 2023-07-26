import express, { Request, Response } from 'express';
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
} from '../../middlewares/validators';

import { HttpStatusCodes, sendApiError, sendApiResponse } from '../../utils';
import { RoleInterface } from '../../interfaces';
import { roleProvider } from '../../providers/roles';

export const userRouter = express.Router();

const passportMiddleware = passport.authenticate('jwt', { session: false });

// user
userRouter.get('/id/:id', idValidator, validateValidationChainResult, getById);

userRouter.get('/username/:username', getByUsername);

userRouter.get(
	'/all/:limit',
	param('limit').custom(isInt),
	validateValidationChainResult,
	getAll
);

userRouter.put(
	'/id/:id',
	passportMiddleware,
	authMiddleware,
	idValidator,
	body('name').optional().notEmpty().isString(),
	body('password').optional().notEmpty().isString(),
	body('location').optional().notEmpty().isString(),
	body('description').optional().notEmpty().isString(),
	body('email').optional().isEmail().notEmpty(),
	validateValidationChainResult,
	putById
);

userRouter.delete(
	'/id/:id',
	idValidator,
	validateValidationChainResult,
	passportMiddleware,
	authMiddleware,
	deleteById
);

// roles

userRouter.get(
	'/roles/:id',
	idValidator,
	validateValidationChainResult,
	async (req: Request, res: Response) => {
		const { id } = req.params;
		try {
			const role: RoleInterface | null = await roleProvider.getById(id);
			if (!role) {
				sendApiError(res, HttpStatusCodes.NOT_FOUND, 'role not found', null);
			}
			sendApiResponse(res, HttpStatusCodes.SUCCESS, role);
		} catch (err) {
			sendApiError(res, HttpStatusCodes.NOT_FOUND, 'role not found', null);
		}
	}
);

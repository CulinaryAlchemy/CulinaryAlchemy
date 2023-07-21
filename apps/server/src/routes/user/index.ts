import express from 'express';
import passport from '../../services/auth';
// providers
import { getById, getByUsername, getAll } from './get';
import { putById } from './put';
import { deleteById } from './delete';

// validators
import { idValidator } from '../../middlewares/validators';
import { authMiddleware } from '../../middlewares';

export const userRouter = express.Router();

const passportMiddleware = passport.authenticate('jwt', { session: false });

// get
userRouter.get('/id/:id', idValidator, getById);

userRouter.get('/username/:username', getByUsername);

userRouter.get('/all/:limit', getAll);

// put
userRouter.put(
	'/id/:id',
	passportMiddleware,
	authMiddleware,
	idValidator,
	putById
);

// delete
userRouter.delete(
	'/id/:id',
	passportMiddleware,
	authMiddleware,
	idValidator,
	deleteById
);

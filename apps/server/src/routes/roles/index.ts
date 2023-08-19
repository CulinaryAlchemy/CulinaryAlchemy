import { rolesControllers } from '../../controllers/user/roles';
import express from 'express';
// validators
import { idValidator } from '../../middlewares/validators';
import { validateValidationChainResult } from '../../middlewares/validators';

export const roleRouter = express.Router();
// roles
roleRouter.get(
	'/:id',
	idValidator,
	validateValidationChainResult,
	rolesControllers.get.byId
);

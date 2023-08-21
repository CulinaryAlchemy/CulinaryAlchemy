import { Controllers } from '../../controllers';
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
	Controllers.Role.get.byId
);

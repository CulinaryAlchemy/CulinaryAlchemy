import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { HttpStatusCodes, sendApiError } from '../../utils';

export const validateValidationChainResult = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return sendApiError(res, HttpStatusCodes.BAD_REQUEST, 'bad request', {
			errors: errors.array(),
		});
	} else {
		next();
	}
};

import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { HttpStatusCodes, ApiResponse } from '../../utils';

export const validateValidationChainResult = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return ApiResponse.error(res, HttpStatusCodes.BAD_REQUEST, 'Bad request', {
			errors: errors.array(),
		});
	} else {
		next();
	}
};

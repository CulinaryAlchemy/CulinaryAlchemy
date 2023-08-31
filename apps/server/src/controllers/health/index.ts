import { Request, Response } from 'express';

import { DatabaseService } from '../../services';
import { HttpStatusCodes, ApiResponse, MessageCodes } from '../../utils';
export const Health = {
	get: async (_req: Request, res: Response) => {
		try {
			await DatabaseService.health.check();
			return ApiResponse.success(
				res,
				HttpStatusCodes.SUCCESS,
				null,
				MessageCodes.SERVER_IS_ON
			);
		} catch (error) {
			console.log(error);
			return ApiResponse.error(
				res,
				HttpStatusCodes.INTERNAL_SERVER_ERROR,
				MessageCodes.INTERNAL_SERVER_ERROR
			);
		}
	},
};

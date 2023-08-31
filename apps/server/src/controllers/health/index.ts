import { Request, Response } from 'express';

import { DatabaseService } from '../../services';
import { HttpStatusCodes, ApiResponse } from '../../utils';
export const Health = {
	get: async (_req: Request, res: Response) => {
		try {
			await DatabaseService.health.check();
			return ApiResponse.success(
				res,
				HttpStatusCodes.SUCCESS,
				null,
				'Database health is okay'
			);
		} catch (error) {
			console.log(error);
			return ApiResponse.error(
				res,
				HttpStatusCodes.INTERNAL_SERVER_ERROR,
				'Error while checking database health'
			);
		}
	},
};

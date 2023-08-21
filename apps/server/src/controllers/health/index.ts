import { Request, Response } from 'express';

import { DatabaseService } from '../../services';
import { HttpStatusCodes, sendApiResponse } from '../../utils';

export const Health = {
	get: async (_req: Request, res: Response) => {
		try {
			await DatabaseService.health.check();
			return sendApiResponse(res, HttpStatusCodes.SUCCESS, null);
		} catch (error) {
			console.log(error);
			return sendApiResponse(res, HttpStatusCodes.INTERNAL_SERVER_ERROR, null);
		}
	},
};

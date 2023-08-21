import { Request, Response } from 'express';
import { DietaryProvider } from '../../providers/dietary';
import { HttpStatusCodes, sendApiError, sendApiResponse } from '../../utils';

export const Dietary = {
	get: {
		all: async (req: Request, res: Response) => {
			const { limit, offset } = req.query;
			const options = {
				limit: limit ? parseInt(limit as string, 10) : 10,
				offset: offset ? parseInt(offset as string, 10) : 0,
			};

			try {
				const allDietaries = await DietaryProvider.get.all(options);
				return sendApiResponse(res, HttpStatusCodes.SUCCESS, allDietaries);
			} catch (error) {
				return sendApiError(res, HttpStatusCodes.INTERNAL_SERVER_ERROR);
			}
		},
		byId: async (req: Request, res: Response) => {
			const { id } = req.params;

			try {
				const dietary = await DietaryProvider.get.byId(parseInt(id, 10));
				if (!dietary) {
					return sendApiError(
						res,
						HttpStatusCodes.NOT_FOUND,
						'dietary not found'
					);
				}
				return sendApiResponse(res, HttpStatusCodes.SUCCESS, dietary);
			} catch (error) {
				return sendApiError(res, HttpStatusCodes.INTERNAL_SERVER_ERROR);
			}
		},
	},
};

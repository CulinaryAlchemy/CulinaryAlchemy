import { Request, Response } from 'express';
import { DietaryProvider } from '../../../providers/user/dietary';
import { HttpStatusCodes, sendApiError, sendApiResponse } from '../../../utils';

export const dietaryController = {
	post: async (req: Request, res: Response) => {
		const { dietaryId } = req.body;
		const { id: userId } = req.params;

		try {
			await DietaryProvider.Associations.addToUser(dietaryId, parseInt(userId));
			sendApiResponse(res, HttpStatusCodes.CREATED, 'dietary added to user');
		} catch (error) {
			console.log(error);
			sendApiError(
				res,
				HttpStatusCodes.INTERNAL_SERVER_ERROR,
				'internal server error'
			);
		}
	},
	delete: async (req: Request, res: Response) => {
		const { dietaryId } = req.body;
		const { id: userId } = req.params;

		try {
			await DietaryProvider.Associations.removeFromUser(
				dietaryId,
				parseInt(userId)
			);
			sendApiResponse(
				res,
				HttpStatusCodes.CREATED,
				'dietary removed from user'
			);
		} catch (error) {
			console.log(error);
			sendApiError(
				res,
				HttpStatusCodes.INTERNAL_SERVER_ERROR,
				'internal server error'
			);
		}
	},
};

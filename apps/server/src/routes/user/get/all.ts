import { Request, Response } from 'express';
import { UserProvider } from '../../../providers/user';
import { sendApiError, sendApiResponse } from '../../../utils/index';
import { HttpStatusCodes } from '../../../utils';

export const getAll = async (req: Request, res: Response) => {
	const { limit } = req.query;
	try {
		let lengthLimit = 10;
		if (limit) {
			lengthLimit = parseInt(limit as string);
		}
		const users = await UserProvider.getUser.All(lengthLimit);
		sendApiResponse(res, HttpStatusCodes.SUCCESS, users);
	} catch (error) {
		sendApiError(res, HttpStatusCodes.NOT_FOUND);
	}
};

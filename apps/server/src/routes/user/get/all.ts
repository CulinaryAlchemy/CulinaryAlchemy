import { Request, Response } from 'express';
import { UserProvider } from '../../../providers/user';
import { sendApiError, sendApiResponse } from '../../../utils/index';
import { HttpStatusCodes } from '../../../utils';

export const getAll = async (req: Request, res: Response) => {
	const { limit } = req.params;
	try {
		const parsedLimit = parseInt(limit);

		const users = await UserProvider.getUser.All(parsedLimit);
		sendApiResponse(res, HttpStatusCodes.SUCCESS, users);
	} catch (error) {
		sendApiError(
			res,
			HttpStatusCodes.NOT_FOUND,
		);
	}
};

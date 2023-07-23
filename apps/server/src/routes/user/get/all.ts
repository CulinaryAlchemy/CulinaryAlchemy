import { Request, Response } from 'express';
import { UserProvider } from '../../../providers/user';
import { sendApiError, sendApiResponse } from '../../../utils/index';
import { HttpStatusCodes } from '../../../utils';

export const getAll = (req: Request, res: Response) => {
	const { limit } = req.params;
	try {
		const parsedLimit = parseInt(limit);

		UserProvider.getUser
			.All(parsedLimit)
			.then((users) =>
				users
					? sendApiResponse(res, HttpStatusCodes.SUCCESS, users)
					: sendApiError(res, HttpStatusCodes.NOT_FOUND, 'users not found')
			)
			.catch(() =>
				sendApiError(
					res,
					HttpStatusCodes.INTERNAL_SERVER_ERROR,
					'internal server error',
					null
				)
			);
	} catch (error) {
		sendApiError(
			res,
			HttpStatusCodes.INTERNAL_SERVER_ERROR,
			'internal server error',
			null
		);
	}
};

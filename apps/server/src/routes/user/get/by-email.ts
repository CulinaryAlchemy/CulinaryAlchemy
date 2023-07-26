import { Request, Response } from 'express';
import { UserProvider } from '../../../providers/user';
import { sendApiError, sendApiResponse } from '../../../utils/index';
import { HttpStatusCodes } from '../../../utils';

export const getByEmail = (req: Request, res: Response) => {
	const { email } = req.body;

	try {
		UserProvider.getUser
			.ByEmail(email, ['password', 'email', 'createdAt', 'updatedAt', 'deletedAt', 'isDeleted'])
			.then((user) =>
				user
					? sendApiResponse(res, HttpStatusCodes.SUCCESS, user)
					: sendApiError(
						res,
						HttpStatusCodes.INTERNAL_SERVER_ERROR,
						'user not found',
						null
					)
			)
			.catch((error) =>
				sendApiError(res, HttpStatusCodes.NOT_FOUND, 'user not found', error)
			);
	} catch (error) {
		sendApiError(
			res,
			HttpStatusCodes.INTERNAL_SERVER_ERROR,
			'interal server error',
			error
		);
	}
};

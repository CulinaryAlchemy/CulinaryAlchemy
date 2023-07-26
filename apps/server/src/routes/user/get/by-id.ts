import { UserProvider } from '../../../providers/user';
import { sendApiError, sendApiResponse } from '../../../utils/index';
import { HttpStatusCodes } from '../../../utils';

import { Request, Response } from 'express';

export const getById = (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		UserProvider.getUser
			.ById(id, ['password', 'email', 'createdAt', 'updatedAt', 'deletedAt', 'isDeleted'])
			.then((users) => {
				if (users) {
					sendApiResponse(res, 200, users);
				} else {
					sendApiError(res, HttpStatusCodes.NOT_FOUND, 'user not found', null);
				}
			})
			.catch((error) =>
				sendApiError(
					res,
					HttpStatusCodes.INTERNAL_SERVER_ERROR,
					'internal server error',
					error
				)
			);
	} catch (error) {
		sendApiError(
			res,
			HttpStatusCodes.INTERNAL_SERVER_ERROR,
			'internal server error',
			error
		);
	}
};

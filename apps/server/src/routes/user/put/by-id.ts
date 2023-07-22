import { UserProvider } from '../../../providers/user';
import { sendApiError, sendApiResponse } from '../../../utils/index';
import { HttpStatusCodes } from '../../../utils';

import { Request, Response } from 'express';

export const putById = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { username, name, email, password, location, description } = req.body;

	try {
		UserProvider.updateUser(id, {
			username,
			name,
			email,
			password,
			location,
			description,
		})
			.then(() => sendApiResponse(res, HttpStatusCodes.CREATED, null))
			.catch((error) =>
				sendApiError(res, HttpStatusCodes.NOT_FOUND, 'user not found', error)
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

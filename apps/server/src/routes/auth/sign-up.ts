import { Request, Response } from 'express';
import { UserProvider } from '../../providers/user';
import { HttpStatusCodes, sendApiError, sendApiResponse } from '../../utils';

export const signUp = (req: Request, res: Response) => {
	const { username, email, password } = req.body;

	try {
		UserProvider.createUser({ username, email, password })
			.then(() => sendApiResponse(res, HttpStatusCodes.CREATED, null))
			.catch((error) => {
				sendApiError(
					res,
					HttpStatusCodes.INTERNAL_SERVER_ERROR,
					'internal server error',
					error
				);
				console.log(error);
			});
	} catch (error) {
		sendApiError(
			res,
			HttpStatusCodes.INTERNAL_SERVER_ERROR,
			'internal server error'
		);
	}
};

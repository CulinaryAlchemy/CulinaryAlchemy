import { Request, Response } from 'express';
import { UserProvider } from '../../providers/user';
import { HttpStatusCodes, sendApiError, sendApiResponse } from '../../utils';
import sequelize from 'sequelize';

export const signUp = async (req: Request, res: Response) => {
	const { username, email, password } = req.body;

	try {
		// check if username is valid
		const doesUsernameAlreadyExist = await UserProvider.getUser.byUsername(
			username
		);

		if (doesUsernameAlreadyExist) {
			return sendApiError(
				res,
				HttpStatusCodes.CONFLICT,
				'Username already exists'
			);
		}

		// check if email is valid
		const doesEmailAlreadyExist = await UserProvider.getUser.ByEmail(email);

		if (doesEmailAlreadyExist) {
			return sendApiError(
				res,
				HttpStatusCodes.CONFLICT,
				'Email already exists'
			);
		}

		const user = await UserProvider.createUser({ username, email, password });
		if (!user) {
			sendApiError(res, HttpStatusCodes.INTERNAL_SERVER_ERROR);
		}

		sendApiResponse(res, HttpStatusCodes.CREATED, null);
	} catch (error) {
		if (error instanceof sequelize.ValidationError) {
			sendApiError(res, HttpStatusCodes.BAD_REQUEST);
		}
		sendApiError(res, HttpStatusCodes.INTERNAL_SERVER_ERROR);
	}
};

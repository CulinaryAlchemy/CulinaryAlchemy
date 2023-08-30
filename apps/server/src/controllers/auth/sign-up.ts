import Jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { ValidationError } from 'sequelize';

import { UserProvider } from '../../providers/user';
import { HttpStatusCodes, sendApiError, sendApiResponse } from '../../utils';

const secret = process.env.JWT_SECRET || 'secret';

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

		const expDate = Date.now() + 1000 * 60 * 48;
		const token = Jwt.sign({ sub: user.id, exp: expDate }, secret);

		const userWithPublicData = await UserProvider.get.byUsername(username)
		sendApiResponse(res, HttpStatusCodes.CREATED, { token, user: userWithPublicData });
	} catch (error) {
		if (error instanceof ValidationError) {
			sendApiError(res, HttpStatusCodes.BAD_REQUEST);
		}
		sendApiError(res, HttpStatusCodes.INTERNAL_SERVER_ERROR);
	}
};

import Jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { ValidationError } from 'sequelize';

import { UserProvider } from '../../providers/user';

import { HttpStatusCodes, ApiResponse } from '../../utils';

const secret = process.env.JWT_SECRET || 'secret';

export const signUp = async (req: Request, res: Response) => {
	const { username, email, password } = req.body;

	try {
		// check if username is valid
		const doesUsernameAlreadyExist = await UserProvider.getUser.byUsername(
			username
		);

		if (doesUsernameAlreadyExist) {
			return ApiResponse.error(
				res,
				HttpStatusCodes.CONFLICT,
				MessageCodes.REGISER_DENIED
			);
		}

		// check if email is valid
		const doesEmailAlreadyExist = await UserProvider.getUser.ByEmail(email);

		if (doesEmailAlreadyExist) {
			return ApiResponse.error(
				res,
				HttpStatusCodes.CONFLICT,
				MessageCodes.REGISER_DENIED
			);
		}

		const user = await UserProvider.createUser({ username, email, password });
		if (!user) {
			ApiResponse.error(
				res,
				HttpStatusCodes.INTERNAL_SERVER_ERROR,
				MessageCodes.REGISER_DENIED
			);
		}

		const expDate = Date.now() + 1000 * 60 * 48;
		const token = Jwt.sign({ sub: user.id, exp: expDate }, secret);

		const userWithPublicData = await UserProvider.getUser.byUsername(username);
		ApiResponse.success(
			res,
			HttpStatusCodes.CREATED,
			{ token, user: userWithPublicData },
			MessageCodes.REGISER_SUCCES
		);
	} catch (error) {
		if (error instanceof ValidationError) {
			ApiResponse.error(
				res,
				HttpStatusCodes.BAD_REQUEST,
				MessageCodes.REGISER_DENIED
			);
		}
		ApiResponse.error(
			res,
			HttpStatusCodes.INTERNAL_SERVER_ERROR,
			MessageCodes.INTERNAL_SERVER_ERROR
		);
	}
};

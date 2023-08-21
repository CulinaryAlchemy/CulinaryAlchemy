import { Request, Response } from 'express';

import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import { UserProvider } from '../../providers/user';
import { HttpStatusCodes, sendApiError, sendApiResponse } from '../../utils';
import { UserInterface } from '../../interfaces';
const secret = process.env.JWT_SECRET || 'secret';

export const signIn = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	const userFromDb: UserInterface | null = await UserProvider.getUser.ByEmail(
		email,
		true
	);
	try {
		if (!userFromDb) {
			return sendApiError(res, HttpStatusCodes.NOT_FOUND, 'User doesnt exist');
		}

		const passwordMatches = userFromDb?.password
			? await bcrypt.compare(password, userFromDb.password)
			: '';

		if (!passwordMatches) {
			return sendApiError(res, HttpStatusCodes.UNAUTHORIZED, 'bad credentials');
		}

		const expDate = Date.now() + 1000 * 60 * 48;
		const token = Jwt.sign({ sub: userFromDb.id, exp: expDate }, secret);

		const user = await UserProvider.getUser.ByEmail(userFromDb.email);
		if (!user) {
			sendApiError(
				res,
				HttpStatusCodes.INTERNAL_SERVER_ERROR,
				'bad credentials'
			);
		}

		sendApiResponse(res, HttpStatusCodes.SUCCESS, { token, user });
	} catch (error) {
		sendApiError(res, HttpStatusCodes.INTERNAL_SERVER_ERROR, 'bad credentials');
	}
};

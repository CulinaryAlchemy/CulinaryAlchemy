import { Request, Response } from 'express';

import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import { UserProvider } from '../../providers/user';
import { HttpStatusCodes, sendApiError, sendApiResponse } from '../../utils';
const secret = process.env.JWT_SECRET || 'secret';

export const signIn = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		let userFromDb = null;
		userFromDb = await UserProvider.getUser.ByEmail(email, true);

		if (!userFromDb) {
			return sendApiError(res, HttpStatusCodes.NOT_FOUND, 'bad credentials');
		}

		const passwordMatches = await bcrypt.compare(password, userFromDb.password);

		if (!passwordMatches) {
			return sendApiError(res, HttpStatusCodes.UNAUTHORIZED, 'bad credentials');
		}

		const expDate = Date.now() + 1000 * 60 * 10;
		const token = Jwt.sign({ sub: userFromDb.id, exp: expDate }, secret);

		const user = await UserProvider.getUser.ByEmail(userFromDb.email);
		sendApiResponse(res, HttpStatusCodes.SUCCESS, { token, user });
	} catch (error) {
		sendApiError(res, HttpStatusCodes.NOT_FOUND, 'bad credentials');
	}
};

import { Request, Response } from 'express';

import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import { UserProvider } from '../../providers/user';
import { HttpStatusCodes, sendApiError, sendApiResponse } from '../../utils';
const secret = process.env.JWT_SECRET || 'secret';

export const signIn = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	let userFromDb: any = null;
	await UserProvider.getUser
		.ByEmail(email)
		.then((user: any) => {
			userFromDb = user.user;
		})
		.catch(() =>
			sendApiError(res, HttpStatusCodes.NOT_FOUND, 'bad credentials')
		);

	if (!userFromDb) {
		return;
	}

	const passwordMatches = await bcrypt.compare(password, userFromDb.password);

	if (!passwordMatches) {
		sendApiError(res, HttpStatusCodes.NOT_FOUND, 'bad credentials');
		return;
	}

	const expDate = Date.now() + 1000 * 60 * 60;
	const token = Jwt.sign({ sub: userFromDb.id, exp: expDate }, secret);

	const user = {
		id: userFromDb.id,
		username: userFromDb.username,
		email: userFromDb.email,
		name: userFromDb.name,
		avatar: userFromDb.avatar,
		description: userFromDb.description,
		location: userFromDb.location,
		dietaryPreferences: userFromDb.dietaryPreferences,
	};

	sendApiResponse(res, HttpStatusCodes.SUCCESS, { token, user });
};

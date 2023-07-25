import { Request, Response } from 'express';

import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import { UserProvider } from '../../providers/user';
import { HttpStatusCodes, sendApiError, sendApiResponse } from '../../utils';
import { getByEmail } from '../user/get/by-email';
import { getById } from '../user/get/by-id';
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
		return sendApiError(res, HttpStatusCodes.NOT_FOUND, 'bad credentials');
	}

	const passwordMatches = await bcrypt.compare(password, userFromDb.password);

	if (!passwordMatches) {
		sendApiError(res, HttpStatusCodes.NOT_FOUND, 'bad credentials');
		return;
	}

	const expDate = Date.now() + 1000 * 60;
	const token = Jwt.sign({ sub: userFromDb.id, exp: expDate }, secret);

	const user = await UserProvider.getUser.ByEmail(userFromDb.id, [
		'password',
		'email',
		'createdAt',
		'updatedAt',
		'deletedAt',
		'isDeleted',
	]);

	sendApiResponse(res, HttpStatusCodes.SUCCESS, { token, user });
};

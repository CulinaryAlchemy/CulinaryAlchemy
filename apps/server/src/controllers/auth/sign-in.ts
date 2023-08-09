import { Request, Response } from 'express';

import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import { UserProvider } from '../../providers/user';
import { HttpStatusCodes, sendApiError, sendApiResponse } from '../../utils';
import { UserInterface } from '../../interfaces';
const secret = process.env.JWT_SECRET || 'secret';

export const signIn = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	console.log({ email, password });
	let userFromDb: UserInterface | any | null = null
	await UserProvider.getUser.ByEmail(email, true)
		.then(user => userFromDb = user)
		.catch(() => userFromDb = null);
	try {

		if (!userFromDb) {
			return sendApiError(res, HttpStatusCodes.CONFLICT, 'User doesnt exist', null, [{
				user: 'USER_DOESNT_EXIST',
			}])
		}

		const passwordMatches = userFromDb?.password ? await bcrypt.compare(password, userFromDb.password) : ''

		if (!passwordMatches) {
			return sendApiError(res, HttpStatusCodes.CONFLICT, 'Password doesnt match', null, [{
				password: 'PASSWORD_IS_INCORRECT',
			}]);
		}

		const expDate = Date.now() + 1000 * 60 * 48;
		const token = Jwt.sign({ sub: userFromDb.id, exp: expDate }, secret);

		const user = await UserProvider.getUser.ByEmail(userFromDb.email);
		sendApiResponse(res, HttpStatusCodes.SUCCESS, { token, user });
	} catch (error) {
		sendApiError(res, HttpStatusCodes.NOT_FOUND, 'bad credentials');
	}
};

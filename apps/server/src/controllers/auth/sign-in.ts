import { Request, Response } from 'express';

import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import { UserProvider } from '../../providers/user';
import { HttpStatusCodes, ApiResponse } from '../../utils';
import { UserInterface } from '../../interfaces';
const secret = process.env.JWT_SECRET || 'secret';

export const signIn = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const userFromDb: UserInterface | null = await UserProvider.getUser.ByEmail(
			email,
			true
		);
		if (!userFromDb) {
			return ApiResponse.error(res, HttpStatusCodes.NOT_FOUND, 'User not found');
		}

		const passwordMatches = userFromDb?.password
			? await bcrypt.compare(password, userFromDb.password)
			: '';

		if (!passwordMatches) {
			return ApiResponse.error(res, HttpStatusCodes.UNAUTHORIZED, 'User password invalid');
		}

		if (userFromDb.deletedAt && userFromDb.id) {
			await UserProvider.updateUser(userFromDb.id, { deletedAt: null });
		}

		const expDate = Date.now() + 1000 * 60 * 48;
		const token = Jwt.sign({ sub: userFromDb.id, exp: expDate }, secret);

		const userPublicInfo = await UserProvider.getUser.ByEmail(userFromDb.email);
		if (!userPublicInfo) {
			ApiResponse.error(
				res,
				HttpStatusCodes.INTERNAL_SERVER_ERROR,
				'bad credentials'
			);
		}

		return ApiResponse.success(res, HttpStatusCodes.SUCCESS, { token, user: userPublicInfo }, 'Sign in successfully');
	} catch (error) {
		return ApiResponse.error(res, HttpStatusCodes.INTERNAL_SERVER_ERROR, 'Internal server error');
	}
};

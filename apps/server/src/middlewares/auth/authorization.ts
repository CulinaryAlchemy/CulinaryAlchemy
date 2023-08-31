import { Request, Response, NextFunction } from 'express';
import Jwt from 'jsonwebtoken';
import { UserProvider } from '../../providers/user';
import { ExtractJwt } from 'passport-jwt';
import { ApiResponse, MessageCodes, HttpStatusCodes } from '../../utils';
import { roleProvider } from '../../providers/roles';
export async function authMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

	if (!token) {
		next('no token provided');
	}

	try {
		const userIdFromJwt = Jwt.verify(token!, process.env.JWT_SECRET!).sub;

		const idInParams = req.params.id;

		if (!idInParams) {
			return ApiResponse.error(
				res,
				HttpStatusCodes.BAD_REQUEST,
				'id is missing in params'
			);
		}
		if (!userIdFromJwt) {
			return ApiResponse.error(
				res,
				HttpStatusCodes.UNAUTHORIZED,
				MessageCodes.SESSION_EXPIRED
			);
		}

		// if the user doesnt exist, reject
		const user = await UserProvider.getUser.ById(
			parseInt(userIdFromJwt as string)
		);
		if (!user) {
			return ApiResponse.error(
				res,
				HttpStatusCodes.UNAUTHORIZED,
				MessageCodes.SESSION_EXPIRED
			);
		}
		//if the user is admin, aprove
		const adminRole = await roleProvider.get.byName('admin');
		if (user.roleId && adminRole && user.roleId === adminRole?.id) {
			return next();
		}
		// if the user makes a request and the user id doesnt matches the req.params id, reject.
		if (userIdFromJwt.toString() !== idInParams) {
			return ApiResponse.error(
				res,
				HttpStatusCodes.BAD_REQUEST,
				'The session id must match the id in param'
			);
		}
		next();
	} catch (error) {
		return ApiResponse.error(
			res,
			HttpStatusCodes.UNAUTHORIZED,
			MessageCodes.SESSION_EXPIRED
		);
	}
}

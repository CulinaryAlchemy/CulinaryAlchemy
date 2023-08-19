import { Request, Response, NextFunction } from 'express';
import Jwt from 'jsonwebtoken';
import { UserProvider } from '../../providers/user';
export async function authMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const bearerFromHeaders = req.headers['authorization'];
	const token = bearerFromHeaders?.split(' ')[1];

	if (!token) {
		next('no token provided');
	}

	try {
		const userIdFromJwt = Jwt.verify(token!, process.env.JWT_SECRET!).sub;

		const idInParams = req.params.id;

		if (!idInParams) {
			return next(
				'there migth be an issue. please contact us throght https://github.com/CulinaryAlchemy/CulinaryAlchemy/issues'
			);
		}
		if (!userIdFromJwt) {
			return next('Missing token');
		}

		// if the user doesnt exist, reject
		const user = await UserProvider.getUser.ById(
			parseInt(userIdFromJwt as string)
		);
		if (!user) {
			return next('unauthorized');
		}
		//if the user is admin, aprove
		const adminRoleId = 2;
		if (user.roleId && user.roleId === adminRoleId) {
			return next();
		}
		// if the user makes a request and the user id doesnt matches the req.params id, reject.
		if (userIdFromJwt.toString() !== idInParams) {
			return next('a');
		}
		next();
	} catch (error) {
		console.log(error);
		next('unauthorized');
	}
}

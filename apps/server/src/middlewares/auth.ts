import { Request, Response, NextFunction } from 'express';
import Jwt from 'jsonwebtoken';
import { UserProvider } from '../providers/user';
export async function authMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const bearerFromHeaders = req.headers['authorization'];
	const token = bearerFromHeaders?.split(' ')[1];

	if (!token) {
		next('internal server error');
	}

	try {
		const userIdDecoded = Jwt.verify(token!, process.env.JWT_SECRET!).sub;

		const id = req.params.id;

		if (!id || !userIdDecoded) {
			next('unauthorized');
		}

		// if the user doesnt exist, reject
		const user: any = await UserProvider.getUser.ById(userIdDecoded as string);
		//if the user is admin, aprove
		if (user?.role && user?.role?.id === 2) {
			next();
		}

		// if the user makes a request and the user id doesnt matches the req.params id, reject.
		if (userIdDecoded !== req.params.id) {
			next('unauthorized');
		}
		next();
	} catch (error) {
		console.log(error);
		next('unauthorized');
	}
}

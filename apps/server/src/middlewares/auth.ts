import { Request, Response, NextFunction } from 'express';
import Jwt from 'jsonwebtoken';
export function authMiddleware(
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

		if (userIdDecoded !== req.params.id || !id) {
			next('internal server error');
		}
		next();
	} catch (error) {
		console.log(error);
		next('internal server error');
	}
}

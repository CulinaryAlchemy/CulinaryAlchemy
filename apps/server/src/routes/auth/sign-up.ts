import { Request, Response } from 'express';
import { UserProvider } from '../../providers/user';
import { HttpStatusCodes, sendApiError, sendApiResponse } from '../../utils';

export const signUp = async (req: Request, res: Response) => {
	const { username, email, password } = req.body;

	try {
		const user = await UserProvider.createUser({ username, email, password });
		sendApiResponse(res, HttpStatusCodes.CREATED, user);
	} catch (error) {
		sendApiError(res, HttpStatusCodes.BAD_REQUEST);
	}
};

import { Request, Response } from 'express';
import { UserProvider } from '../../../providers/user';
import { sendApiError, sendApiResponse } from '../../../utils/index';
import { HttpStatusCodes } from '../../../utils';

export const getByEmail = async (req: Request, res: Response) => {
	const { email } = req.body;

	try {
		const user = await UserProvider.getUser.ByEmail(email);
		sendApiResponse(res, HttpStatusCodes.SUCCESS, user);
	} catch (error) {
		sendApiError(
			res,
			HttpStatusCodes.NOT_FOUND
		);
	}
};

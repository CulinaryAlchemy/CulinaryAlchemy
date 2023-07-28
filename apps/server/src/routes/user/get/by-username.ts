import { UserProvider } from '../../../providers/user';
import { sendApiError, sendApiResponse } from '../../../utils/index';
import { HttpStatusCodes } from '../../../utils';

import { Request, Response } from 'express';

export const getByUsername = async (req: Request, res: Response) => {
	const { username } = req.params;
	try {
		const user = await UserProvider.getUser.ByUsername(username);
		sendApiResponse(res, HttpStatusCodes.SUCCESS, user);
	} catch (error) {
		sendApiError(
			res,
			HttpStatusCodes.NOT_FOUND
		);
	}
};

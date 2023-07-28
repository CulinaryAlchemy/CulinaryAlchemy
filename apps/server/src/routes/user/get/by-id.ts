import { UserProvider } from '../../../providers/user';
import { sendApiError, sendApiResponse } from '../../../utils/index';
import { HttpStatusCodes } from '../../../utils';

import { Request, Response } from 'express';

export const getById = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const user = await UserProvider.getUser.ById(id);
		sendApiResponse(res, HttpStatusCodes.SUCCESS, user);
	} catch (error) {
		sendApiError(
			res,
			HttpStatusCodes.NOT_FOUND
		);
	}
};

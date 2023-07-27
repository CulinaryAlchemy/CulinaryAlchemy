import { UserProvider } from '../../../providers/user';
import { sendApiError, sendApiResponse } from '../../../utils/index';
import { HttpStatusCodes } from '../../../utils';

import { Request, Response } from 'express';

export const deleteById = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		await UserProvider.deleteUser(id);
		sendApiResponse(res, HttpStatusCodes.SUCCESS, null);
	} catch (error) {
		sendApiError(
			res,
			HttpStatusCodes.NOT_FOUND,
		);
	}
};

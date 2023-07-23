import { UserProvider } from '../../../providers/user';
import { sendApiError, sendApiResponse } from '../../../utils/index';
import { HttpStatusCodes } from '../../../utils';

import { Request, Response } from 'express';

export const deleteById = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		UserProvider.deleteUser(id)
			.then(() => sendApiResponse(res, HttpStatusCodes.SUCCESS, null))
			.catch((error) =>
				sendApiError(
					res,
					HttpStatusCodes.BAD_REQUEST,
					'internal server error',
					error
				)
			);
	} catch (error) {
		sendApiError(
			res,
			HttpStatusCodes.INTERNAL_SERVER_ERROR,
			'internal server error',
			error
		);
	}
};

import { Request, Response } from 'express';
import { UserProvider } from '../../../providers/user';
import { sendApiError, sendApiResponse } from '../../../utils/index';
import { HttpStatusCodes } from '../../../utils';
import { getObjectLength } from '../../../utils/object-length';

export const putById = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { username, name, email, password, location, description } = req.body;

	const params = {
		username,
		name,
		email,
		password,
		location,
		description,
	};

	const requestParamsLength = getObjectLength(params);

	if (requestParamsLength <= 0) {
		return sendApiError(
			res,
			HttpStatusCodes.BAD_REQUEST,
			'no params provided',
			null
		);
	}

	try {
		await UserProvider.updateUser(id, {
			username,
			name,
			email,
			password,
			location,
			description,
		});
		sendApiResponse(res, HttpStatusCodes.CREATED, null);
	} catch (error) {
		console.log(error);
		sendApiError(
			res,
			HttpStatusCodes.INTERNAL_SERVER_ERROR
		);
	}
};

import { Request, Response } from 'express';
import { UserProvider } from '../../../providers/user';
import { sendApiError, sendApiResponse } from '../../../utils/index';
import { HttpStatusCodes } from '../../../utils';
import { getObjectLength } from '../../../utils/object-length';
import { cloudinaryService } from '../../../services';

export const putById = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { username, name, email, password, location, description } = req.body;
	const avatar = req.file;
	const params: {
		username: string
		name: string
		avatar?: string;
		email: string
		password: string
		location: string
		description: string
	} = {
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
		if (avatar) {
			const avatarUrl = await cloudinaryService.uploadImage(avatar);
			params.avatar = avatarUrl;
		}
		await UserProvider.updateUser(id, {
			username,
		});
		sendApiResponse(res, HttpStatusCodes.CREATED, null);
	} catch (error) {
		console.log(error);
		sendApiError(res, HttpStatusCodes.INTERNAL_SERVER_ERROR);
	}
};

import { Request, Response } from 'express';

import { UserProvider } from '../../providers/user';
import { sendApiError, sendApiResponse } from '../../utils/index';
import { HttpStatusCodes } from '../../utils';
import { cleanObjectNullKeys, getObjectKeys } from '../../utils/object.utils';
import { cloudinaryService } from '../../services';

const User = {
	delete: {
		ById: async (req: Request, res: Response) => {
			const { id } = req.params;

			try {
				await UserProvider.deleteUser(id);
				return sendApiResponse(res, HttpStatusCodes.SUCCESS, null);
			} catch (error) {
				return sendApiError(res, HttpStatusCodes.NOT_FOUND);
			}
		},
	},
	get: {
		all: async (req: Request, res: Response) => {
			const { limit, offset } = req.query;
			let finalLimit;
			let finalOffset;
			limit ? (finalLimit = parseInt(limit as string)) : (finalLimit = 10);
			offset ? (finalOffset = parseInt(offset as string)) : (finalOffset = 0);
			try {
				const users = await UserProvider.getUser.All({
					limit: finalLimit,
					offset: finalOffset,
				});
				return sendApiResponse(res, HttpStatusCodes.SUCCESS, users);
			} catch (error) {
				return sendApiError(res, HttpStatusCodes.NOT_FOUND);
			}
		},
		byEmail: async (req: Request, res: Response) => {
			const { email } = req.body;
			try {
				const user = await UserProvider.getUser.ByEmail(email);
				if (!user) {
					return sendApiError(res, HttpStatusCodes.NOT_FOUND);
				}

				sendApiResponse(res, HttpStatusCodes.SUCCESS, user);
			} catch (error) {
				sendApiError(res, HttpStatusCodes.NOT_FOUND);
			}
		},
		byId: async (req: Request, res: Response) => {
			const { id } = req.params;
			try {
				const user = await UserProvider.getUser.ById(parseInt(id));
				if (!user) {
					return sendApiError(res, HttpStatusCodes.NOT_FOUND);
				}

				sendApiResponse(res, HttpStatusCodes.SUCCESS, user);
			} catch (error) {
				console.log(error);
				return sendApiError(res, HttpStatusCodes.NOT_FOUND);
			}
		},
		byUsername: async (req: Request, res: Response) => {
			const { username } = req.params;
			try {
				const user = await UserProvider.getUser.byUsername(username);
				if (!user) {
					return sendApiError(res, HttpStatusCodes.NOT_FOUND);
				}

				sendApiResponse(res, HttpStatusCodes.SUCCESS, user);
			} catch (error) {
				sendApiError(res, HttpStatusCodes.NOT_FOUND);
			}
		},
	},
	checkIfAvailable: {
		username: async (req: Request, res: Response) => {
			const { username } = req.body;
			const isUsernameavailable = await UserProvider.checkAvaiability.username(
				username
			);

			if (isUsernameavailable) {
				return sendApiResponse(res, HttpStatusCodes.SUCCESS, null);
			} else {
				return sendApiError(res, HttpStatusCodes.CONFLICT);
			}
		},
		email: async (req: Request, res: Response) => {
			const { email } = req.body;
			const isEmailavailable = await UserProvider.checkAvaiability.email(email);

			if (isEmailavailable) {
				return sendApiResponse(res, HttpStatusCodes.SUCCESS, null);
			} else {
				return sendApiError(res, HttpStatusCodes.CONFLICT);
			}
		},
	},
	put: {
		byId: async (req: Request, res: Response) => {
			interface Params {
				username: string;
				name: string;
				avatar?: string;
				header?: string;
				email: string;
				password: string;
				location: string;
				description: string;
			}
			const { id } = req.params;
			const { username, name, email, password, location, description } =
				req.body;
			const params: Params = {
				username,
				name,
				email,
				password,
				location,
				description,
			};
			if (req.files && 'avatar' in req.files) {
				const avatarFile = req.files['avatar'][0] as Express.Multer.File;
				const avatarUrl = await cloudinaryService.uploadImage(
					avatarFile as unknown as Express.Multer.File,
					400,
					400
				);
				params.avatar = avatarUrl;
			}
			if (req.files && 'header' in req.files) {
				const headerFile = req.files['header'][0] as Express.Multer.File;
				const headerUrl = await cloudinaryService.uploadImage(
					headerFile as unknown as Express.Multer.File,
					1080,
					360
				);
				params.header = headerUrl;
			}

			const requestParamsLength = getObjectKeys(params);

			if (requestParamsLength <= 0) {
				return sendApiError(
					res,
					HttpStatusCodes.BAD_REQUEST,
					'no params provided',
					null
				);
			}
			try {
				const finalParams = cleanObjectNullKeys(params);
				await UserProvider.updateUser(id, { ...finalParams });

				return sendApiResponse(res, HttpStatusCodes.CREATED, null);
			} catch (error) {
				console.log(error);
				return sendApiError(res, HttpStatusCodes.INTERNAL_SERVER_ERROR);
			}
		},
	},
	manageDietary: {
		add: async (req: Request, res: Response) => {
			const { dietaryId } = req.body;
			const { id: userId } = req.params;

			try {
				await UserProvider.AssociateWith.dietary.add(
					dietaryId,
					parseInt(userId)
				);
				sendApiResponse(res, HttpStatusCodes.CREATED, 'dietary added to user');
			} catch (error) {
				console.log(error);
				sendApiError(
					res,
					HttpStatusCodes.INTERNAL_SERVER_ERROR,
					'internal server error'
				);
			}
		},
		remove: async (req: Request, res: Response) => {
			const { dietaryId } = req.body;
			const { id: userId } = req.params;

			try {
				await UserProvider.AssociateWith.dietary.remove(
					dietaryId,
					parseInt(userId)
				);
				sendApiResponse(
					res,
					HttpStatusCodes.CREATED,
					'dietary removed from user'
				);
			} catch (error) {
				console.log(error);
				sendApiError(
					res,
					HttpStatusCodes.INTERNAL_SERVER_ERROR,
					'internal server error'
				);
			}
		},
	},
};
export { User };

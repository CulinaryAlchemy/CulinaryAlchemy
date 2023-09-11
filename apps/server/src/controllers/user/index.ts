import { Request, Response } from 'express';

import { UserProvider } from '../../providers/user';
import {
	ApiResponse,
	HttpStatusCodes,
	MessageCodes,
} from '../../utils/index';
import { cleanObjectNullKeys, getObjectLength } from '../../utils/object.utils';
import { cloudinaryService } from '../../services';

const User = {
	delete: {
		ById: async (req: Request, res: Response) => {
			const { id } = req.params;

			try {
				await UserProvider.deleteUser(id);
				return ApiResponse.success(
					res,
					HttpStatusCodes.SUCCESS,
					null,
					MessageCodes.ACCOUNT_DESACTIVATED
				);
			} catch (error) {
				return ApiResponse.error(
					res,
					HttpStatusCodes.NOT_FOUND,
					MessageCodes.USER_NOT_FOUND
				);
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

				if (users.length <= 0) {
					return ApiResponse.error(
						res,
						HttpStatusCodes.NOT_FOUND,
						MessageCodes.USERS_NOT_FOUND
					);
				}

				return ApiResponse.success(
					res,
					HttpStatusCodes.SUCCESS,
					users,
					MessageCodes.USER_FOUND
				);
			} catch (error) {
				return ApiResponse.error(
					res,
					HttpStatusCodes.INTERNAL_SERVER_ERROR,
					MessageCodes.INTERNAL_SERVER_ERROR
				);
			}
		},
		byEmail: async (req: Request, res: Response) => {
			const { email } = req.body;
			try {
				const user = await UserProvider.getUser.ByEmail(email);
				if (!user) {
					return ApiResponse.error(
						res,
						HttpStatusCodes.NOT_FOUND,
						MessageCodes.USER_NOT_FOUND
					);
				}

				ApiResponse.success(
					res,
					HttpStatusCodes.SUCCESS,
					user,
					MessageCodes.USER_FOUND
				);
			} catch (error) {
				ApiResponse.error(
					res,
					HttpStatusCodes.NOT_FOUND,
					MessageCodes.INTERNAL_SERVER_ERROR
				);
			}
		},
		byId: async (req: Request, res: Response) => {
			const { id } = req.params;
			try {
				const user = await UserProvider.getUser.ById(parseInt(id));
				if (!user) {
					return ApiResponse.error(
						res,
						HttpStatusCodes.NOT_FOUND,
						MessageCodes.USER_NOT_FOUND
					);
				}

				ApiResponse.success(
					res,
					HttpStatusCodes.SUCCESS,
					user,
					MessageCodes.USER_FOUND
				);
			} catch (error) {
				return ApiResponse.error(
					res,
					HttpStatusCodes.NOT_FOUND,
					MessageCodes.INTERNAL_SERVER_ERROR
				);
			}
		},
		byUsername: async (req: Request, res: Response) => {
			const { username } = req.params;
			try {
				const user = await UserProvider.getUser.byUsername(username);
				if (!user) {
					return ApiResponse.error(
						res,
						HttpStatusCodes.NOT_FOUND,
						MessageCodes.USER_NOT_FOUND
					);
				}

				ApiResponse.success(
					res,
					HttpStatusCodes.SUCCESS,
					user,
					MessageCodes.USER_FOUND
				);
			} catch (error) {
				ApiResponse.error(
					res,
					HttpStatusCodes.NOT_FOUND,
					MessageCodes.INTERNAL_SERVER_ERROR
				);
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
				return ApiResponse.success(res, HttpStatusCodes.SUCCESS, null, '');
			} else {
				return ApiResponse.error(
					res,
					HttpStatusCodes.CONFLICT,
					'Username already in use'
				);
			}
		},
		email: async (req: Request, res: Response) => {
			const { email } = req.body;
			const isEmailavailable = await UserProvider.checkAvaiability.email(email);

			if (isEmailavailable) {
				return ApiResponse.success(res, HttpStatusCodes.SUCCESS, null, '');
			} else {
				return ApiResponse.error(
					res,
					HttpStatusCodes.CONFLICT,
					'Email already in use'
				);
			}
		},
	},
	put: {
		byId: async (req: Request, res: Response) => {
			interface Params {
				username: string;
				name: string;
				avatar?: string;
				avatarBlur?: string;
				header?: string;
				headerBlur?: string;
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
			if (req.files) {
				try {
					// avatar
					if ('avatar' in req.files) {
						const avatarFile = req.files['avatar'][0] as Express.Multer.File;
						const avatarUrl = await cloudinaryService.uploadImage(
							avatarFile as unknown as Express.Multer.File
						);
						params.avatar = avatarUrl;
					}
					if ('avatarBlur' in req.files) {
						const avatarBlurFile = req.files[
							'avatarBlur'
						][0] as Express.Multer.File;
						const avatarBlurUrl = await cloudinaryService.uploadImage(
							avatarBlurFile as unknown as Express.Multer.File
						);
						params.avatarBlur = avatarBlurUrl;
					}

					// header
					if ('header' in req.files) {
						const headerFile = req.files['header'][0] as Express.Multer.File;
						const headerUrl = await cloudinaryService.uploadImage(
							headerFile as unknown as Express.Multer.File
						);
						params.header = headerUrl;
					}
					if ('headerBlur' in req.files) {
						const headerBlurFile = req.files[
							'headerBlur'
						][0] as Express.Multer.File;
						const headerBlurUrl = await cloudinaryService.uploadImage(
							headerBlurFile as unknown as Express.Multer.File
						);
						params.headerBlur = headerBlurUrl;
					}
				} catch (error) {
					return ApiResponse.error(
						res,
						HttpStatusCodes.INTERNAL_SERVER_ERROR,
						''
					);
				}
			}
			const requestParamsLength = getObjectLength(params);

			if (requestParamsLength <= 0) {
				return ApiResponse.error(
					res,
					HttpStatusCodes.BAD_REQUEST,
					'No params provided',
					null
				);
			}
			try {
				const finalParams: any = cleanObjectNullKeys(params);
				await UserProvider.updateUser(id, { ...finalParams });
				const userWithUpdatedValues = await UserProvider.getUser.ById(
					parseInt(id)
				);
				return ApiResponse.success(
					res,
					HttpStatusCodes.CREATED,
					userWithUpdatedValues,
					MessageCodes.DATA_UPDATED
				);
			} catch (error) {
				console.log(error);
				return ApiResponse.error(
					res,
					HttpStatusCodes.INTERNAL_SERVER_ERROR,
					MessageCodes.INTERNAL_SERVER_ERROR
				);
			}
		},
	},
	manageDietary: {
		add: async (req: Request, res: Response) => {
			const { dietaryId } = req.params;
			const { id: userId } = req.params;

			try {
				await UserProvider.AssociateWith.dietary.add(
					parseInt(dietaryId, 10),
					parseInt(userId)
				);
				ApiResponse.success(
					res,
					HttpStatusCodes.CREATED,
					null,
					MessageCodes.DATA_UPDATED
				);
			} catch (error) {
				console.log(error);
				ApiResponse.error(
					res,
					HttpStatusCodes.INTERNAL_SERVER_ERROR,
					MessageCodes.INTERNAL_SERVER_ERROR
				);
			}
		},
		remove: async (req: Request, res: Response) => {
			const { dietaryId } = req.params;
			const { id: userId } = req.params;

			try {
				await UserProvider.AssociateWith.dietary.remove(
					parseInt(dietaryId, 10),
					parseInt(userId)
				);
				ApiResponse.success(
					res,
					HttpStatusCodes.CREATED,
					null,
					MessageCodes.DATA_UPDATED
				);
			} catch (error) {
				console.log(error);
				ApiResponse.error(
					res,
					HttpStatusCodes.INTERNAL_SERVER_ERROR,
					MessageCodes.INTERNAL_SERVER_ERROR
				);
			}
		},
	},
};
export { User };

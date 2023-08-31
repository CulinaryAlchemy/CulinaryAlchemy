import { Request, Response } from 'express';

import { UserProvider } from '../../providers/user';
import { ApiResponse, HttpStatusCodes } from '../../utils/index';
import { cleanObjectNullKeys, getObjectKeys } from '../../utils/object.utils';
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
					'Account desactivated'
				);
			} catch (error) {
				return ApiResponse.error(
					res,
					HttpStatusCodes.NOT_FOUND,
					'Error while desactivating account, the user is already deleted or doesnt exist'
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
				return ApiResponse.success(res, HttpStatusCodes.SUCCESS, users, '');
			} catch (error) {
				return ApiResponse.error(
					res,
					HttpStatusCodes.NOT_FOUND,
					'Internal server error while looking for users'
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
						'User not found'
					);
				}

				ApiResponse.success(res, HttpStatusCodes.SUCCESS, user, '');
			} catch (error) {
				ApiResponse.error(
					res,
					HttpStatusCodes.NOT_FOUND,
					'Internal server error while looking for user'
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
						'User not found'
					);
				}

				ApiResponse.success(res, HttpStatusCodes.SUCCESS, user, '');
			} catch (error) {
				return ApiResponse.error(
					res,
					HttpStatusCodes.NOT_FOUND,
					'Internal server error while looking for user'
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
						'User not found'
					);
				}

				ApiResponse.success(res, HttpStatusCodes.SUCCESS, user, '');
			} catch (error) {
				ApiResponse.error(
					res,
					HttpStatusCodes.NOT_FOUND,
					'Internal server error while looking for user'
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
				return ApiResponse.error(
					res,
					HttpStatusCodes.BAD_REQUEST,
					'no params provided',
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
					'User updated'
				);
			} catch (error) {
				console.log(error);
				return ApiResponse.error(
					res,
					HttpStatusCodes.INTERNAL_SERVER_ERROR,
					'Internal server error while updating user'
				);
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
				ApiResponse.success(
					res,
					HttpStatusCodes.CREATED,
					null,
					'Dietary added to profile'
				);
			} catch (error) {
				console.log(error);
				ApiResponse.error(
					res,
					HttpStatusCodes.INTERNAL_SERVER_ERROR,
					'internal server error while adding dietary to profile'
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
				ApiResponse.success(
					res,
					HttpStatusCodes.CREATED,
					null,
					'dietary removed from profile'
				);
			} catch (error) {
				console.log(error);
				ApiResponse.error(
					res,
					HttpStatusCodes.INTERNAL_SERVER_ERROR,
					'internal server error while removing dietary from profilef'
				);
			}
		},
	},
};
export { User };

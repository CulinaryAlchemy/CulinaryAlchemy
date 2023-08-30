import { Request, Response } from 'express';
import { UserProvider } from '../../providers/user';
import { HttpStatusCodes, ApiResponse } from '../../utils';
import { ValidationError } from 'sequelize';

export const signUp = async (req: Request, res: Response) => {
	const { username, email, password } = req.body;

	try {
		// check if username is valid
		const doesUsernameAlreadyExist = await UserProvider.getUser.byUsername(
			username
		);

		if (doesUsernameAlreadyExist) {
			return ApiResponse.error(
				res,
				HttpStatusCodes.CONFLICT,
				'Username already in use'
			);
		}

		// check if email is valid
		const doesEmailAlreadyExist = await UserProvider.getUser.ByEmail(email);

		if (doesEmailAlreadyExist) {
			return ApiResponse.error(
				res,
				HttpStatusCodes.CONFLICT,
				'Email already exists'
			);
		}

		const user = await UserProvider.createUser({ username, email, password });
		if (!user) {
			ApiResponse.error(res, HttpStatusCodes.INTERNAL_SERVER_ERROR, 'Error while creating user');
		}

		ApiResponse.success(res, HttpStatusCodes.CREATED, null, 'User created successfully');
	} catch (error) {
		if (error instanceof ValidationError) {
			ApiResponse.error(res, HttpStatusCodes.BAD_REQUEST, 'Validation Error');
		}
		ApiResponse.error(res, HttpStatusCodes.INTERNAL_SERVER_ERROR, 'There is been an unexpected error');
	}
};

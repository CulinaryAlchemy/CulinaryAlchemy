import { Request, Response } from 'express';
import { UserProvider } from '../../providers/user';
import { HttpStatusCodes, sendApiError, sendApiResponse } from '../../utils';

export const signUp = async (req: Request, res: Response) => {
	const { username, email, password } = req.body;

	try {
		// check if username is valid
		const doesUsernameAlreadyExist = await UserProvider.getUser.ByUsername(username)
			.then(() => true) // case it returns an user
			.catch(() => null) // case it doesnt returns an user

		if (doesUsernameAlreadyExist) {
			return sendApiError(res, HttpStatusCodes.CONFLICT, 'Username already exists', null, [{
				username: 'USERNAME_IS_ALREADY_IN_USE',
			}]);
		}

		// check if email is valid
		const doesEmailAlreadyExist = await UserProvider.getUser.ByEmail(email)
			.then(() => true) // case it returns an user
			.catch(() => null) // case it doesnt returns an user

		if (doesEmailAlreadyExist) {
			return sendApiError(res, HttpStatusCodes.CONFLICT, 'Email already exists', null, [{
				email: 'EMAIL_IS_ALREADY_IN_USE',
			}]);
		}


		const user = await UserProvider.createUser({ username, email, password });
		sendApiResponse(res, HttpStatusCodes.CREATED, user);
	} catch (error) {
		sendApiError(res, HttpStatusCodes.BAD_REQUEST);
	}
};

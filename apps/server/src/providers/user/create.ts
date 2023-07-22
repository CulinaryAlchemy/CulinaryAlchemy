import { User } from '../../db/models';

export const createUser = async ({
	username,
	email,
	password,
}: {
	username: string;
	email: string;
	password: string;
}) => {
	return new Promise((resolve, reject) => {
		try {
			const newUser = User.build({ username, email, password });

			newUser.validate().then(() => newUser.save());
			resolve('');
		} catch (error) {
			reject({ error });
		}
	});
};

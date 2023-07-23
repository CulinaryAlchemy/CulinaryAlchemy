import { User } from '../../db/models';

export const updateUser = async (
	id: string,
	{
		username,
		name,
		email,
		password,
		location,
		description,
	}: {
		username: string;
		name: string;
		email: string;
		password: string;
		location: string;
		description: string;
	}
) => {
	return new Promise(async (resolve, reject) => {
		try {
			let user: any = await User.findByPk(id);

			if (!user || user.isDeleted) {
				reject('');
			}

			if (username) {
				user.username = username;
			}

			if (name) {
				user.name = name;
			}
			if (email) {
				user.email = email;
			}
			if (password) {
				user.password = password;
			}
			if (location) {
				user.location = location;
			}
			if (description) {
				user.description = description;
			}

			user.save().then(() => resolve(''));
		} catch (error) {
			reject({ error });
		}
	});
};

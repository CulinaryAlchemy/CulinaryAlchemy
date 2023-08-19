import { User } from '../../models/user/index';

export const updateUser = async (
	id: string,
	{
		username,
		name,
		avatar,
		email,
		password,
		location,
		description,
	}: {
		username?: string;
		name?: string;
		avatar?: string;
		email?: string;
		password?: string;
		location?: string;
		description?: string;
	}
) => {
	try {
		// eslint-disable-next-line prefer-const
		let user = await User.findByPk(id);

		if (!user || user.isDeleted) {
			return Promise.reject('user is already deleted or does not exist');
		}

		if (username) {
			user.username = username;
		}

		if (name) {
			user.name = name;
		}

		if (avatar) {
			user.avatar = avatar;
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

		await user.validate();

		await user.save();

		return Promise.resolve('');
	} catch (error) {
		console.log(error);
		return Promise.reject(error);
	}
};

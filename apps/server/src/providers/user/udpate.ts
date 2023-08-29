import { cloudinaryService } from '../../services';
import { User } from '../../models/user/index';

export const updateUser = async (
	id: string | number,
	{
		username,
		name,
		avatar,
		header,
		email,
		password,
		location,
		description,
		deletedAt,
	}: {
		username?: string;
		name?: string;
		avatar?: string;
		header?: string;
		email?: string;
		password?: string;
		location?: string;
		description?: string;
		deletedAt: Date | null;
	}
) => {
	try {
		// eslint-disable-next-line prefer-const
		let user = await User.findOne({
			where: {
				id: id,
				deletedAt: null,
			},
		});

		if (!user || user.deletedAt) {
			return Promise.reject('user is already deleted or does not exist');
		}

		if (username) {
			user.username = username;
		}

		if (name) {
			user.name = name;
		}

		if (avatar) {
			await cloudinaryService.deleteImage(user.avatar);
			user.avatar = avatar;
		}

		if (header) {
			await cloudinaryService.deleteImage(user.header);
			user.header = header;
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

		if(deletedAt){
			user.deletedAt = deletedAt;
		}

		await user.validate();

		await user.save();

		return Promise.resolve();
	} catch (error) {
		return Promise.reject(error);
	}
};

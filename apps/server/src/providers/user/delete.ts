import { User } from '../../models/user/index';

export const deleteUser = async (id: string) => {
	try {
		const user = await User.findByPk(id);
		if (!user) {
			return Promise.reject('user does not exist');
		}

		if (user.deletedAt) {
			return Promise.reject('user already deleted');
		}

		user.deletedAt = new Date();

		await user.save();

		return Promise.resolve('');
	} catch (error) {
		return Promise.reject(error);
	}
};

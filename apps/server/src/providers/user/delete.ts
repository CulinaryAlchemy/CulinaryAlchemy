import { User } from '../../models';

export const deleteUser = async (id: string) => {
	try {
		const user = await User.findByPk(id);
		if (!user) {
			return Promise.reject('user does not exist');
		}

		if (user.isDeleted) {
			return Promise.reject('user already deleted');
		}

		user.isDeleted = true;

		await user.save();

		return Promise.resolve('');
	} catch (error) {
		// here we handle the error writing it into the errors.txt file
		return Promise.reject(error);
	}
};

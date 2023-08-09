import { UserProvider } from '.';
import { User, Role } from '../../models';
export const createUser = async ({
	username,
	email,
	password,
	isAdmin = false,
}: {
	username: string;
	email: string;
	password: string;
	isAdmin?: boolean;
}) => {
	try {
		const newUser = User.build({ username, email, password });

		await newUser.validate();

		await newUser.save();

		let userRole;

		if (!isAdmin) {
			userRole = await Role.findOne({ where: { name: 'user' } });
		} else {
			userRole = await Role.findOne({ where: { name: 'admin' } });
		}

		if (userRole) {
			newUser.roleId = userRole.id;
			await newUser.save();
		}

		const newUserFromDb = await UserProvider.getUser.ByEmail(email);

		return Promise.resolve(newUserFromDb);
	} catch (error) {
		// handle the error printing it intot the errors.txt
		return Promise.reject(error);
	}
};

import { User, Role } from '../../db/models';
export const createUser = async ({
	username,
	email,
	password,
	isAdmin,
}: {
	username: string;
	email: string;
	password: string;
	isAdmin?: boolean;
}) => {
	return new Promise(async (resolve, reject) => {
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

			resolve('');
		} catch (error) {
			reject({ error });
		}
	});
};

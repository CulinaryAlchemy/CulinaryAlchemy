import { User, Role } from '../../db/models';
export const createUser = async ({
	username,
	email,
	password,
}: {
	username: string;
	email: string;
	password: string;
}) => {
	return new Promise(async (resolve, reject) => {
		try {
			const newUser = User.build({ username, email, password });

			await newUser.validate();

			await newUser.save();
			
			const userRole = await Role.findOne({ where: { name: 'user' } });
			if (userRole) {
				newUser.roleId = userRole.id;
				await newUser.save();
			}

			resolve('')
		} catch (error) {
			reject({ error });
		}
	});
};

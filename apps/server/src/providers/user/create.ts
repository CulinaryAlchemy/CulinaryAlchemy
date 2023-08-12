import { UserProvider } from '.';
import { User } from '../../models';
import { roleProvider } from '../roles';
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

		let userRole = null;

		if (!isAdmin) {
			userRole = await roleProvider.get.byName('user')
			if(!userRole){
				console.log(userRole);
				throw new Error('User role not found')
			}
		} else {
			userRole = await roleProvider.get.byName('admin')
			if(!userRole){
				console.log(userRole);
				throw new Error('User role not found')
			}
		}

		if (userRole?.id) {
			newUser.roleId = userRole.id;
			await newUser.save();
		}

		const newUserFromDb = await UserProvider.getUser.ByEmail(email);
		if (!newUserFromDb) {
			return Promise.reject('User not found')
		}
		return Promise.resolve(newUserFromDb);
	} catch (error) {
		return Promise.reject(error);
	}
};

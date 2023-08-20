import { UserProvider } from '.';
import { User } from '../../models/user/index';
import { RoleType } from '../../interfaces/role.interface';
import { DatabaseService } from '../../services';

export const createUser = async ({
	username,
	email,
	password,
	role = 'user',
}: {
	username: string;
	email: string;
	password: string;
	role?: RoleType;
}) => {
	const transaction = await DatabaseService.getTransaction();
	try {
		const user = User.build({ username, email, password });

		const userWithRole = await UserProvider.AssociateWith.role.add(user, role);

		await userWithRole.save({ transaction });

		await transaction.commit();
		return Promise.resolve(userWithRole);
	} catch (error) {
		await transaction.rollback();
		return Promise.reject(error);
	}
};

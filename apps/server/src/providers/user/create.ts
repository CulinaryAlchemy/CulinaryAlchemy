import { UserProvider } from '.';
import { User } from '../../models/user/index';
import { RoleType } from '../../interfaces/role/role.interface';
import { DatabaseService } from '../../services';
import { defaultImages } from '../../config/default-images';

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
	const avatar = defaultImages.avatar;
	const header = defaultImages.header;
	const headerBlur = defaultImages.headerBlur;
	const avatarBlur = defaultImages.avatarBlur;
	try {
		const user = User.build({ username, email, password, avatar, avatarBlur, header, headerBlur });

		const userWithRole = await UserProvider.AssociateWith.role.add(user, role);

		await userWithRole.validate();

		await userWithRole.save({ transaction });

		await transaction.commit();
		return Promise.resolve(userWithRole);
	} catch (error) {
		await transaction.rollback();
		return Promise.reject(error);
	}
};

import { UserProvider } from '.';
import { RoleType } from '../../interfaces/role/role.interface';
import { User, UserDietary } from '../../models/user';
import { DietaryProvider } from '../dietary';
import { roleProvider } from '../roles';

async function validateUserAlreadyHasDietary(
	userId: number,
	dietaryId: number
) {
	let doesTheUserAlreadyHaveTheDietary = true;
	try {
		const userDietary = await UserDietary.findOne({
			where: {
				userId: userId,
				dietaryId: dietaryId,
			},
		});
		if (!userDietary) {
			doesTheUserAlreadyHaveTheDietary = false;
		}
	} catch (error) {
		throw new Error('internal server error');
	}

	if (doesTheUserAlreadyHaveTheDietary) {
		return true;
	} else {
		return false;
	}
}

async function validateUserAndDietaryExist(userId: number, dietaryId: number) {
	let doBothExist = false;
	try {
		const dietary = await DietaryProvider.get.byId(dietaryId);
		const user = await UserProvider.getUser.ById(userId);

		if (dietary && user) {
			doBothExist = true;
		}
	} catch (error) {
		return Promise.reject(error);
	}

	if (!doBothExist) {
		return Promise.reject('dietary does not exist');
	}

	return Promise.resolve();
}
export const AssociateWith = {
	dietary: {
		add: async (dietaryId: number, userId: number) => {
			// verifications before associating
			try {
				await validateUserAndDietaryExist(userId, dietaryId);
				const userHasTheDietary = await validateUserAlreadyHasDietary(
					userId,
					dietaryId
				);
				if (userHasTheDietary) {
					return Promise.reject('user already has this dietary');
				}
			} catch (error) {
				return Promise.reject('internal server error');
			}

			// we associate the dietary with he user
			try {
				UserDietary.create({
					userId: userId,
					dietaryId: dietaryId,
				});
			} catch (error) {
				return Promise.reject('internal server error');
			}
			return Promise.resolve();
		},
		remove: async (dietaryId: number, userId: number) => {
			// verifications before associating
			try {
				await validateUserAndDietaryExist(userId, dietaryId);
				const userHasTheDietary = await validateUserAlreadyHasDietary(
					userId,
					dietaryId
				);
				if (!userHasTheDietary) {
					return Promise.reject('user does not have this dietary');
				}
			} catch (error) {
				console.log(error);
				return Promise.reject('internal server error');
			}

			try {
				const thisUserDietary = await UserDietary.findOne({
					where: {
						userId: userId,
						dietaryId: dietaryId,
					},
				});
				await thisUserDietary?.destroy({ force: true });

				return Promise.resolve();
			} catch (error) {
				return Promise.reject('internal server error');
			}
		},
	},
	role: {
		add: async (user: User, role: RoleType) => {
			let userRole = null;

			switch (role) {
			case 'admin':
				{
					const role = await roleProvider.get.byName('admin');
					if (!role) {
						console.log('Admin role not found, role varaiable: ', role);
						return Promise.reject('Admin role not found');
					}
					userRole = role;
				}
				break;
			case 'user':
				{
					const role = await roleProvider.get.byName('user');
					if (!role) {
						console.log('User role not found, role varaiable: ', role);
						return Promise.reject('User role not found');
					}
					userRole = role;
				}
				break;
			}

			if (userRole && userRole?.id) {
				try {
					user.roleId = userRole.id;
					return Promise.resolve(user);
				} catch (error) {
					return Promise.reject('internal server error');
				}
			} else {
				return Promise.reject('internal server error');
			}
		},
	},
};

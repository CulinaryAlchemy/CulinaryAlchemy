import { Role, User, UserDietary } from '../../models/user/index';

export const getUser = {
	ById: async (id: number, isForInternalServerUse: boolean = false) => {
		let excludedPropety: string[] = [];
		if (!isForInternalServerUse) {
			excludedPropety = [
				'password',
				'email',
				'createdAt',
				'updatedAt',
				'deletedAt',
				'isDeleted',
			];
		}
		try {
			const user = await User.findOne({
				where: {
					id: id,
					isDeleted: false,
				},
				attributes: { exclude: [...excludedPropety] },
				include: [
					{ model: Role, as: 'role' },
					{
						model: UserDietary,
						as: 'userDietary',
						attributes: ['id'],
					},
				],
			});
			return Promise.resolve(user);
		} catch (error) {
			return Promise.reject(error);
		}
	},
	ByEmail: async (email: string, isForInternalServerUse: boolean = false) => {
		let excludedPropety: string[] = [];
		if (!isForInternalServerUse) {
			excludedPropety = [
				'password',
				'email',
				'createdAt',
				'updatedAt',
				'deletedAt',
				'isDeleted',
			];
		}
		try {
			const user = await User.findOne({
				where: {
					email: email,
					isDeleted: false,
				},
				attributes: { exclude: [...excludedPropety] },
				include: { model: Role, as: 'role' },
			});
			return Promise.resolve(user);
		} catch (error) {
			return Promise.reject(error);
		}
	},
	ByUsername: async (
		username: string,
		isForInternalServerUse: boolean = false
	) => {
		let excludedPropety: string[] = [];
		if (!isForInternalServerUse) {
			excludedPropety = [
				'password',
				'email',
				'createdAt',
				'updatedAt',
				'deletedAt',
				'isDeleted',
			];
		}
		try {
			const user = await User.findOne({
				attributes: { exclude: [...excludedPropety] },
				where: {
					username: username,
					isDeleted: false,
				},
				include: { model: Role, as: 'role' },
			});
			return Promise.resolve(user);
		} catch (error) {
			return Promise.reject(error);
		}
	},
	All: async ({ limit, offset }: { limit: number; offset: number }) => {
		try {
			const users = await User.findAll({
				attributes: ['id'],
				limit: limit,
				offset: offset,
				where: {
					isDeleted: false,
				},
			});
			return Promise.resolve(users);
		} catch (error) {
			return Promise.reject(error);
		}
	},
};

// REMOVE REJECTION IF THE USER DOESNT EXIST.

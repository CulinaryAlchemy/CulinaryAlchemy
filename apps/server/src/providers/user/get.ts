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
			];
		}
		try {
			const user = await User.findOne({
				where: {
					id: id,
					deletedAt: null,
				},
				attributes: { exclude: [...excludedPropety] },
				include: [
					{ model: Role, as: 'role' },
					{
						model: UserDietary,
						as: 'userDietary',
						attributes: ['dietaryId'],
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
			];
		}
		try {
			const user = await User.findOne({
				where: {
					email: email,
					deletedAt: null,
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
			];
		}
		try {
			const user = await User.findOne({
				attributes: { exclude: [...excludedPropety] },
				where: {
					username: username,
					deletedAt: null,
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
					deletedAt: null,
				},
			});
			return Promise.resolve(users);
		} catch (error) {
			return Promise.reject(error);
		}
	},
};

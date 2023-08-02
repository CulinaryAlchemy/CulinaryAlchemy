import { User } from '../../db/models';

export const getUser = {
	ById: async (id: string, isForInternalServerUse: boolean = false) => {
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
				include: 'role',
			});
			if (!user) {
				return Promise.reject(new Error('user not found'));
			}
			return Promise.resolve(user);
		} catch (error) {
			return Promise.reject('');
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
				include: 'role',
			});
			if (!user) {
				return Promise.reject(new Error('user not found'));
			}
			return Promise.resolve(user);
		} catch (error) {
			return Promise.reject('');
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
				include: 'role',
			});

			if (!user) {
				return Promise.reject(new Error('user not found'));
			}

			return Promise.resolve(user);
		} catch (error) {
			return Promise.reject('');
		}
	},
	All: async (limit: number) => {
		try {
			const users = await User.findAll({
				attributes: ['id'],
				limit: limit,
				where: {
					isDeleted: false,
				},
			});
			if (!users) {
				return Promise.reject(new Error('users not found'));
			}
			return Promise.resolve(users);
		} catch (error) {
			return Promise.reject('');
		}
	},
};

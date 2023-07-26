import { User } from '../../db/models';

export const getUser = {
	ById: async (id: string, excludedPropety: string[] | string = []) => {
		return new Promise(async (resolve, reject) => {
			try {
				const user = await User.findOne({
					attributes: { exclude: [...excludedPropety] },
					where: {
						id: id,
						isDeleted: false,
					},
				});
				if (!user) {
					reject('user not found');
				}
				resolve({ user });
			} catch (error) {
				reject({ error });
			}
		});
	},
	ByEmail: async (email: string, excludedPropety: string[] | string = []) => {
		return new Promise(async (resolve, reject) => {
			const user = await User.findOne({
				where: {
					email: email,
					isDeleted: false,
				},
				attributes: { exclude: [...excludedPropety] },
				include: 'role',
			});
			resolve(user);
		});
	},
	ByUsername: async (
		username: string,
		excludedPropety: string[] | string = []
	) => {
		return new Promise(async (resolve, reject) => {
			try {
				const user = await User.findOne({
					attributes: { exclude: [...excludedPropety] },
					where: {
						username: username,
						isDeleted: false,
					},
				});

				if (!user) {
					reject('user not found');
				}

				resolve({ user });
			} catch (error) {
				reject({ error });
			}
		});
	},
	All: async (limit: number) => {
		return new Promise(async (resolve, reject) => {
			try {
				const users = await User.findAll({
					attributes: {
						exclude: [
							'password',
							'email',
							'createdAt',
							'updatedAt',
							'deletedAt',
							'isDeleted',
						],
					},
					limit: limit,
					where: {
						isDeleted: false,
					},
				});
				if (!users) {
					reject('users not found');
				}
				resolve({ users });
			} catch (error) {
				reject({ error });
			}
		});
	},
};

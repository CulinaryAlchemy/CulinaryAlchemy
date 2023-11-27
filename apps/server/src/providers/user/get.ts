import { Recipe, Role, User, UserDietary } from '../../models/';

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
					{
						model: UserDietary,
						as: 'userDietary',
						attributes: ['dietaryId'],
					},
					{ model: Role, as: 'role' },
				],
			});
			return Promise.resolve(user);
		} catch (error) {
			return Promise.reject(error);
		}
	},
	ByEmail: async (email: string, isForInternalServerUse: boolean = false) => {
		let excludedPropety: string[] = [];
		const whereCondition: any = { email: email };
		if (!isForInternalServerUse) {
			excludedPropety = [
				'password',
				'email',
				'createdAt',
				'updatedAt',
				'deletedAt',
			];
			whereCondition['deletedAt'] = null;
		}
		try {
			const user = await User.findOne({
				where: {
					...whereCondition,
				},
				attributes: { exclude: [...excludedPropety] },
				include: [{ model: Role, as: 'role' }],
			});
			return Promise.resolve(user);
		} catch (error) {
			return Promise.reject(error);
		}
	},
	byUsername: async (
		username: string,
		includeProfile: boolean = false,
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
				'userDietary',
			];
		}

		// eslint-disable-next-line prefer-const
		let includeOptions = [];
		if (includeProfile) {
			includeOptions.push(
				{
					model: Recipe,
					as: 'recipes',
					attributes: ['id'],
				},
				{ model: Role, as: 'role' }
			);
		}

		try {
			const user = await User.findOne({
				attributes: { exclude: [...excludedPropety] },
				where: {
					username: username,
					deletedAt: null,
				},
				include: includeOptions,
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

import { UserProvider } from '..';
import { Dietary, UserDietary } from '../../../models/user';

async function validateUserAlreadyHasDietary(
	userId: number,
	dietaryId: number
) {
	// we check if the user already has the dietary
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

	// if it doesnt exist, we reject the promise
	if (!doBothExist) {
		return Promise.reject('dietary does not exist');
	}

	return Promise.resolve();
}

export const DietaryProvider = {
	Associations: {
		addToUser: async (dietaryId: number, userId: number) => {
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
		removeFromUser: async (dietaryId: number, userId: number) => {
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
	get: {
		byId: async (dietaryId: number) => {
			try {
				const dietary = await Dietary.findByPk(dietaryId);
				return Promise.resolve(dietary);
			} catch (error) {
				return Promise.reject(error);
			}
		},
		byTitle: async (title: string) => {
			try {
				const dietary = await Dietary.findOne({
					where: { title: title },
				});
				return Promise.resolve(dietary);
			} catch (error) {
				return Promise.reject(error);
			}
		},
		all: async ({
			limit = 10,
			offset = 0,
		}: {
			limit: number;
			offset: number;
		}) => {
			try {
				const dietaries = await Dietary.findAll({
					offset: offset,
					limit: limit,
					attributes: ['id'],
				});
				return Promise.resolve(dietaries);
			} catch (error) {
				return Promise.reject(error);
			}
		},
	},
	post: async ({
		title,
		description,
	}: {
		title: string;
		description: string;
	}) => {
		// check if the dietary already exist
		try {
			const doesDietaryAlreadyExist = await Dietary.findOne({
				where: { title: title },
			});
			if (doesDietaryAlreadyExist) {
				return Promise.reject('Dietary already exists');
			}
		} catch (error) {
			return Promise.reject(error);
		}

		// we create a new dietary
		try {
			const newDietary = Dietary.build({ title, description });
			await newDietary.validate();
			await newDietary.save();

			return Promise.resolve();
		} catch (error) {
			return Promise.reject(error);
		}
	},
	put: async (
		id: number,
		{
			title,
			description,
		}: {
			title: string;
			description: string;
		}
	) => {
		try {
			// check if dietary exist
			const doesDietaryExist = await Dietary.findByPk(id);
			if (!doesDietaryExist) {
				return Promise.reject('Dietary does not exist');
			}

			// update
			if (title) {
				await doesDietaryExist.update({ title });
			}
			if (description) {
				await doesDietaryExist.update({ description });
			}

			return Promise.resolve();
		} catch (error) {
			return Promise.reject(error);
		}
	},
};

import { Dietary } from '../../models';

const DietaryProvider = {
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

export { DietaryProvider };

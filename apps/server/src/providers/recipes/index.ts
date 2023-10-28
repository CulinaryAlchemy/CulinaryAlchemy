import { type RecipeInterface } from '../../interfaces';
import { MealType, Recipe, Image, Dietary } from '../../models';
import { MealTypeXRecipe, RecipeXDietary } from '../../models/shared';
import { Transaction } from 'sequelize';

const get = {
	byId: async (id: number) => {
		try {
			const recipe = await Recipe.findByPk(id, {
				include: [
					{ model: Image, as: 'images' },
					{ model: Dietary },
					{ model: MealType },
				],
			});
			return Promise.resolve(recipe);
		} catch (error) {
			return Promise.reject(error);
		}
	},
	all: async (limit: number = 10, offset: number = 0) => {
		try {
			const recipes = await Recipe.findAll({
				where: { end_date: null },
				limit: limit,
				offset: offset,
				attributes: ['id'],
			});
			return Promise.resolve(recipes);
		} catch (error) {
			return Promise.reject(error);
		}
	},
	byUserId: async (userId: string) => {
		try {
			const recipes = await Recipe.findAll({
				where: {
					user_id: userId,
				},
				attributes: ['id'],
			});
			return Promise.resolve(recipes);
		} catch (error) {
			return Promise.reject(error);
		}
	},
};
const post = async ({
	recipe,
	dietaryIds,
	mealTypeIds,
	transaction: t,
}: {
	recipe: RecipeInterface;
	mealTypeIds?: number[];
	dietaryIds?: number[];
	transaction?: Transaction;
}) => {
	const {
		cooking_time,
		description,
		equipment_needed,
		ingredients,
		servings,
		steps,
		title,
		user_id,
		authors_notes,
		spices,
		youtube_link,
	} = recipe;

	try {
		// create recipe
		const newRecipe = Recipe.build({
			user_id,
			title,
			description,
			cooking_time,
			equipment_needed,
			ingredients,
			servings,
			steps: steps ? JSON.stringify(steps) : null,
			authors_notes,
			spices,
			youtube_link,
		});

		await newRecipe.save({ transaction: t ?? null });

		// associate it with a meal type
		if (mealTypeIds) {
			for (const id of mealTypeIds) {
				const doesMealtypeExist = await MealType.findByPk(id);

				if (!doesMealtypeExist) {
					throw new Error(
						'One of the mealTypeIds doesnt exist. mealType id not existing: ' +
							id
					);
				}

				await MealTypeXRecipe.create(
					{ meal_type_id: id, recipe_id: newRecipe.id },
					{ transaction: t }
				);
			}
		}
		// associate it with a dietary
		if (dietaryIds) {
			for (const id of dietaryIds) {
				const doesDietaryIds = await MealType.findByPk(id);

				if (!doesDietaryIds) {
					throw new Error(
						'One of the dietariesIds doesnt exist. Dietary id not existing: ' +
							id
					);
				}

				await RecipeXDietary.create(
					{ dietary_id: id, recipe_id: newRecipe.id },
					{ transaction: t }
				);
			}
		}

		return Promise.resolve(newRecipe);
	} catch (error) {
		return Promise.reject(
			new Error(
				`There is been an errow while creating the recipe. Error: ${error}`
			)
		);
	}
};

const updateRecipe = async (recipe: RecipeInterface) => {
	if (typeof recipe.id === 'string') recipe.id = parseInt(recipe.id);
	if (!recipe.id && recipe.id !== 0)
		return Promise.reject(new Error('Recipe id is required'));

	try {
		const recipeInDb = await Recipe.findByPk(recipe.id);
		if (!recipeInDb) {
			return Promise.reject(new Error('Recipe not found'));
		}
		await recipeInDb.update(recipe);

		return Promise.resolve('');
	} catch (e) {
		return Promise.reject(e);
	}
};

const remove = async (recipeId: number) => {
	try {
		const recipe = await Recipe.findByPk(recipeId);
		if (!recipe || recipe.end_date !== null) {
			return Promise.reject(new Error('Recipe not found, or already deleted'));
		}

		recipe.end_date = new Date();
		await recipe.save();
		return Promise.resolve();
	} catch (error) {
		return Promise.reject(error);
	}
};

export const recipesProvider = {
	post,
	get,
	updateRecipe,
	remove,
};

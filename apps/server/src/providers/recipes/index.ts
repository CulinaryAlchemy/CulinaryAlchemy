import { sequelize } from '../../database/database.connection';
import { RecipeInterface, ImageInterface } from '../../interfaces';
import { MealType, Recipe, Image } from '../../models';
import { MealTypeXRecipe, RecipeXDietary } from '../../models/shared';

// const get = {
// 	//
// };
const post = async (
	recipe: RecipeInterface,
	imagesUrls: ImageInterface[],
	mealTypeIds?: number[],
	dietaryIds?: number[]
) => {
	const {
		cooking_time,
		description,
		equipment_needed,
		id,
		ingredients,
		servings,
		steps,
		title,
		user_id,
		authors_notes,
		spices,
		youtube_link,
	} = recipe;

	const t = await sequelize.transaction();

	try {
		// create recipe
		const newRecipe = Recipe.build({
			id,
			user_id,
			title,
			description,
			cooking_time,
			equipment_needed,
			ingredients,
			servings,
			steps,
			authors_notes,
			spices,
			youtube_link,
		});

		await newRecipe.save({ transaction: t });

		// create an image register (the database model) and set owner id to recipe id
		for (const image of imagesUrls) {
			await Image.create(
				{
					default_url: image.default_url,
					blur_url: image.blur_url,
					owner_id: newRecipe.id,
				},
				{ transaction: t }
			);
		}

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

		await t.commit();
		
		return Promise.resolve(newRecipe);
	} catch (error) {
		await t.rollback();

		console.log('inside provider post function');
		return Promise.reject(
			new Error(
				`There is been an errow while creating the recipe. Error: ${error}`
			)
		);
	}
};
// const put = () => {};
// const remove = () => {};

export const recipesProvider = {
	post,
};

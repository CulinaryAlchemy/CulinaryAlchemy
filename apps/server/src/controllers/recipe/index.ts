import { Request, Response } from 'express';
import { recipesProvider } from '../../providers/recipes';
import { ApiResponse, HttpStatusCodes } from '../../utils';
import { Image, User } from '../../models';
import { cloudinaryService } from '../../services';
import { sequelize } from '../../database/database.connection';
import { type RecipeInterface } from '../../interfaces';
import { cleanObjectNullKeys } from '../../utils/object.utils';

const get = {
	byId: async (req: Request, res: Response) => {
		const { id } = req.params;

		try {
			const recipe = await recipesProvider.get.byId(parseInt(id));
			if (!recipe) {
				return ApiResponse.error(res, HttpStatusCodes.NOT_FOUND, 'NOT_FOUND');
			}
			return ApiResponse.success(
				res,
				HttpStatusCodes.SUCCESS,
				recipe,
				'RECIPE_FOUND'
			);
		} catch (error) {
			return ApiResponse.error(res, HttpStatusCodes.NOT_FOUND, 'NOT_FOUND');
		}
	},
	all: async (req: Request, res: Response) => {
		const { limit, offset } = req.query;

		const parsedLimit = limit ? parseInt(limit as string) : 10;
		const parsedOffset = offset ? parseInt(offset as string) : 0;

		try {
			const recipes = await recipesProvider.get.all(parsedLimit, parsedOffset);
			return ApiResponse.success(
				res,
				HttpStatusCodes.SUCCESS,
				recipes,
				'RECIPES_FOUND'
			);
		} catch (error) {
			return ApiResponse.error(res, HttpStatusCodes.NOT_FOUND, 'NOT_FOUND');
		}
	},
};
const post = async (req: Request, res: Response) => {
	const {
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
	}: RecipeInterface = req.body;

	const user_id = parseInt(req.params.id);

	const t = await sequelize.transaction();

	// we check the user exist
	const doesUserExist = await User.findByPk(user_id);
	if (!doesUserExist || doesUserExist.deletedAt !== null) {
		throw new Error('USER_DOES_NOT_EXIST, or its already deleted');
	}

	if (Object.keys((req as any)).lenght >= 2) {
		console.log('images received)
		const reqFiles = (req as any).files;

		const keysInRequestFileObj = Object.keys(reqFiles);

		const normalImages = keysInRequestFileObj.filter(
			(imageKey) => !imageKey.endsWith('blur')
		);

		const blurImages = keysInRequestFileObj.filter((iamgeKey) =>
			iamgeKey.endsWith('blur')
		);

		// we verify we have couples of images
		if (normalImages.length !== blurImages.length) {
			return ApiResponse.error(
				res,
				HttpStatusCodes.BAD_REQUEST,
				'every iamge must have a blur image'
			);
		}

		let defaultImage: string = '';

		for (const key of keysInRequestFileObj) {
			const imageFile = reqFiles[key][0] as Express.Multer.File;
			const imageUrl = (await cloudinaryService.uploadImage(imageFile))
				.secure_url;

			if (!imageFile.fieldname.endsWith('blur')) {
				defaultImage = imageUrl;
				return;
			}
			if (imageFile.fieldname.endsWith('blur')) {
				if (!defaultImage) {
					throw new Error('internal server error');
				}
				await Image.create(
					{
						owner_id: user_id,
						blur_url: imageUrl,
						default_url: defaultImage,
					},
					{ transaction: t }
				);
			}
		}
	} else{
		console.log('no images received')
	}

	try {
		const newRecipe = await recipesProvider.post({
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

		await t.commit();
		return ApiResponse.success(res, HttpStatusCodes.CREATED, newRecipe, '');
	} catch (error) {
		await t.rollback();
		console.log(error);
		return ApiResponse.error(
			res,
			HttpStatusCodes.INTERNAL_SERVER_ERROR,
			'ERROR_WHILE_POSTING_RECIPE'
		);
	}
};
const put = async (req: Request, res: Response) => {
	const { recipeId } = req.params;

	const {
		title,
		description,
		cooking_time,
		equipment_needed,
		ingredients,
		servings,
		authors_notes,
		steps,
		spices,
		youtube_link,
	}: RecipeInterface = req.body;
	const recipe = {
		id: recipeId,
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
	};

	// we check if the steps are received, and if they're, we stringify them.
	steps ? (recipe.steps = JSON.stringify(steps)) : (recipe.steps = null);

	// validate recipe exist
	try {
		const doesRecipeExist = await recipesProvider.get.byId(parseInt(recipeId));
		if (!doesRecipeExist) {
			return ApiResponse.error(
				res,
				HttpStatusCodes.INTERNAL_SERVER_ERROR,
				'INTERNAL_SERVER_ERROR',
				'recipe doesnt exist'
			);
		}
	} catch (error) {
		return ApiResponse.error(
			res,
			HttpStatusCodes.INTERNAL_SERVER_ERROR,
			'INTERNAL_SERVER_ERROR',
			'recipe doesnt exist'
		);
	}

	const cleanRecipeObj: RecipeInterface = cleanObjectNullKeys(
		recipe
	) as RecipeInterface;

	if (Object.keys(cleanRecipeObj).length === 0) {
		return ApiResponse.error(
			res,
			HttpStatusCodes.BAD_REQUEST,
			'BAD_REQUEST',
			'no params received in the server'
		);
	}

	try {
		await recipesProvider.updateRecipe(cleanRecipeObj);
	} catch (error) {
		console.log(error);
		return ApiResponse.error(
			res,
			HttpStatusCodes.INTERNAL_SERVER_ERROR,
			'INTERNAL_SERVER_ERROR',
			'error while updating the recipe'
		);
	}

	return ApiResponse.success(
		res,
		HttpStatusCodes.SUCCESS,
		null,
		'RECIPE_UPDATED'
	);
};

const remove = async (req: Request, res: Response) => {
	const { recipeId } = req.params;

	try {
		await recipesProvider.remove(parseInt(recipeId));
		return ApiResponse.success(
			res,
			HttpStatusCodes.SUCCESS,
			null,
			'RECIPES_FOUND'
		);
	} catch (error) {
		return ApiResponse.error(
			res,
			HttpStatusCodes.INTERNAL_SERVER_ERROR,
			'INTERNAL_SERVER_ERROR'
		);
	}
};
export const recipeController = {
	post,
	get,
	put,
	remove,
};

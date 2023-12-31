import { Request, Response } from 'express';
import { recipesProvider } from '../../providers/recipes';
import { ApiResponse, HttpStatusCodes } from '../../utils';
import { User, Image } from '../../models';
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
	byUserId: async (req: Request, res: Response) => {
		const userId = req.params.id;

		const userRecipes = await recipesProvider.get.byUserId(userId).catch(() => {
			return ApiResponse.error(
				res,
				HttpStatusCodes.INTERNAL_SERVER_ERROR,
				'INTERNAL_SERVER_ERROR'
			);
		});

		return ApiResponse.success(res, HttpStatusCodes.SUCCESS, userRecipes, '');
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

	try {
		const newRecipe = await recipesProvider.post({
			recipe: {
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
			},
			transaction: t,
		});

		if (req.files && Object.keys(req.files as object).length >= 2) {
			console.log('images received');
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
					'every image must have a blur image'
				);
			}

			for (let i = 0; i < keysInRequestFileObj.length; i++) {
				const imageFile = reqFiles[
					`${keysInRequestFileObj[i]}`
				][0] as Express.Multer.File;

				// if the image ends with blur
				if (imageFile.fieldname.endsWith('blur')) {
					const blurImage = imageFile;
					const defaultImage =
						reqFiles[`${imageFile.fieldname.replace('_blur', '')}`][0];

					if (!blurImage || !defaultImage) {
						return ApiResponse.error(
							res,
							HttpStatusCodes.BAD_REQUEST,
							'blur image and default image are required'
						);
					}

					try {
						const defaultImageUrl = (
							await cloudinaryService.uploadImage(defaultImage)
						).secure_url;
						const blurImageUrl = (
							await cloudinaryService.uploadImage(blurImage)
						).secure_url;

						console.log({ defaultImageUrl, blurImageUrl });
						await Image.create(
							{
								owner_id: newRecipe.id,
								blur_url: blurImageUrl,
								default_url: defaultImageUrl,
							},
							{ transaction: t }
						);
					} catch (error) {
						await t.rollback();
						ApiResponse.error(
							res,
							HttpStatusCodes.INTERNAL_SERVER_ERROR,
							'Error while uploading images'
						);
						console.log(error);
						throw new Error('Error while uploading images');
					}
				}
			}
		}

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

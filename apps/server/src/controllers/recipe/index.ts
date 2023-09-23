import { Request, Response } from 'express';
import { recipesProvider } from '../../providers/recipes';
import { ApiResponse, HttpStatusCodes } from '../../utils';
import { Image, User } from '../../models';
import { cloudinaryService } from '../../services';

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
	} = req.body;

	const user_id = parseInt(req.params.id);

	// we check the user exist
	const doesUserExist = await User.findByPk(user_id);
	if (!doesUserExist || doesUserExist.deletedAt !== null) {
		throw new Error('USER_DOES_NOT_EXIST, or its already deleted');
	}

	const reqFiles = (req as any).files;

	const keysInRequestFileObj = Object.keys(reqFiles);
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
			await Image.create({
				owner_id: user_id,
				blur_url: imageUrl,
				default_url: defaultImage,
			});
		}
	}

	try {
		const newRecipe = await recipesProvider.post({
			user_id,
			title,
			description,
			cooking_time,
			equipment_needed: JSON.stringify(equipment_needed),
			ingredients: JSON.stringify(ingredients),
			servings,
			steps: JSON.stringify(steps),
			authors_notes,
			spices: JSON.stringify(spices),
			youtube_link,
		});
		ApiResponse.success(res, HttpStatusCodes.CREATED, newRecipe, '');
		return;
	} catch (error) {
		ApiResponse.error(
			res,
			HttpStatusCodes.INTERNAL_SERVER_ERROR,
			'ERROR_WHILE_POSTING_RECIPE'
		);
		return;
	}
};
export const recipeController = {
	post,
};

import { Request, Response } from 'express';
import { recipesProvider } from '../../providers/recipes';
import { ApiResponse, HttpStatusCodes } from '../../utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const post = async (_req: Request, res: Response) => {
	try {
		const newRecipe = await recipesProvider.post(
			{
				authors_notes: 'the author notes',
				cooking_time: 2,
				description: 'A description for the recipe.',
				equipment_needed: JSON.stringify(['equipment 1', 'equipment 2', 'equipment 3', 'equipment 4']),
				ingredients: JSON.stringify(['ingredient 1', 'ingredient 2', 'ingredient 3', 'ingredient 4', 'ingredient 5']),
				servings: 2,
				spices: JSON.stringify(['spice 1', 'spice 2', 'spice 3', 'spice 4', 'spice 5', 'spice 6']),
				steps: JSON.stringify(['step 1', 'step 2', 'step 3', 'step 4', 'step 5', 'step 6', 'step 7']),
				title: 'Recipe title',
				user_id: 1,
				youtube_link:
					'https://www.youtube.com/video/my-recipe-cooking-video-url',
			},
			[
				{
					blur_url:
						'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
					default_url:
						'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
					owner_id: 1,
				},
			],
			[1],
			[1]
		);
		ApiResponse.success(res, HttpStatusCodes.CREATED, newRecipe, '');
		return;
	} catch (error) {
		console.log('inside catch block!', error);
		return ApiResponse.error(
			res,
			HttpStatusCodes.INTERNAL_SERVER_ERROR,
			'ERROR_WHILE_POSTING_RECIPE',
			error
		);
	}
};
export const recipeController = {
	post,
};

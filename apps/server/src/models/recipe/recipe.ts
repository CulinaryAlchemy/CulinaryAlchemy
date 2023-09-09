import { Model, DataTypes } from 'sequelize';

import { RecipeInterface } from 'interfaces/recipe/recipe.interface';
import { sequelize } from 'database/database.connection';

class Recipe extends Model<RecipeInterface> implements RecipeInterface {
	id!: number;
	title!: string;
	description!: string;
	authors_notes!: string | null;
	cooking_time!: number;
	servings!: number;
	equipment_needed!: string;
	ingredients!: string;
	spices!: string | null;
	youtube_link!: string | null;
}
Recipe.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: DataTypes.STRING,
		},
		description: {
			type: DataTypes.STRING,
		},
		authors_notes: {
			type: DataTypes.STRING,
		},
		ingredients: {
			type: DataTypes.STRING,
		},
		spices: {
			type: DataTypes.STRING,
		},
		cooking_time: {
			type: DataTypes.INTEGER,
		},
		servings: {
			type: DataTypes.INTEGER,
		},
		equipment_needed: {
			type: DataTypes.STRING,
		},
		youtube_link: {
			type: DataTypes.STRING,
		},
	},
	{
		sequelize,
		modelName: 'Recipes',
	}
);

export { Recipe };

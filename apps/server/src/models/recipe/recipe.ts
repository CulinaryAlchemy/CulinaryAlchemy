import { Model, DataTypes } from 'sequelize';

import { RecipeInterface } from '../../interfaces/recipe/recipe.interface';
import { sequelize } from '../../database/database.connection';

class Recipe extends Model<RecipeInterface> implements RecipeInterface {
	id!: number;
	user_id!: number;
	title!: string;
	description!: string;
	steps!: string;
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
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [3, 70],
			},
		},
		description: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		authors_notes: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		ingredients: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		spices: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		cooking_time: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				isInt: true,
				min: 0,
			},
		},
		equipment_needed: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		servings: {
			type: DataTypes.INTEGER,
			allowNull: true,
			validate: {
				min: 0,
				isInt: true,
			},
		},
		steps: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		youtube_link: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				isUrl: true,
			},
		},
	},
	{
		sequelize,
		modelName: 'Recipes',
	}
);

export { Recipe };

import { sequelize } from '../../database/database.connection';
import { MealTypeXRecipeInterface } from '../../interfaces/shared';
import { DataTypes, Model } from 'sequelize';

class MealTypeXRecipe
	extends Model<MealTypeXRecipeInterface>
	implements MealTypeXRecipeInterface
{
	id!: number;
	recipe_id!: number;
	meal_type_id!: number;
}
MealTypeXRecipe.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		recipe_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		meal_type_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{ sequelize, modelName: 'MealTypesXRecipes', timestamps: false }
);
export { MealTypeXRecipe };

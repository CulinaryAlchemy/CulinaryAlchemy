import { DataTypes, Model } from 'sequelize';
import { RecipeXDietaryInterface } from '../../interfaces';
import { sequelize } from '../../database/database.connection';

class RecipeXDietary
	extends Model<RecipeXDietaryInterface>
	implements RecipeXDietaryInterface
{
	id!: number;
	recipe_id!: number;
	dietary_id!: number;
}
RecipeXDietary.init(
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
		dietary_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{ sequelize, modelName: 'RecipeXDietary', timestamps: false }
);
export { RecipeXDietary };

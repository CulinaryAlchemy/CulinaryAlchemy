import { sequelize } from '../../database/database.connection';
import { MealTypeInterface } from '../../interfaces/meal-type';
import { DataTypes, Model } from 'sequelize';

class MealType extends Model<MealTypeInterface> implements MealTypeInterface {
	id!: number;
	name!: string;
}
MealType.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{ sequelize, modelName: 'MealTypes', timestamps: false }
);
export { MealType };

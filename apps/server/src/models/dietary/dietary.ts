import { DataTypes, Model } from 'sequelize';
import { DietaryInterface } from '../../interfaces/dietary.interface';
import { sequelize } from '../../database/database.connection';

class Dietary extends Model<DietaryInterface> implements DietaryInterface {
	id!: number;
	title!: string;
	description!: string;
}

Dietary.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: DataTypes.STRING,
			validate: {
				len: [3, 50],
			},
		},
		description: {
			type: DataTypes.TEXT,
			validate: {
				len: [150, 500],
			},
		},
	},
	{
		sequelize,
		modelName: 'Dietary',
		timestamps: false,
	}
);
export { Dietary };

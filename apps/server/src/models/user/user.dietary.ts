import { DataTypes, Model } from 'sequelize';
import { UserDietaryInterface } from '../../interfaces/user.dietary.interface';
import { sequelize } from '../../database/database.connection';

class UserDietary
	extends Model<UserDietaryInterface>
	implements UserDietaryInterface
{
	id!: number;
	userId!: number;
	dietaryId!: number;
	start_date!: Date;
	end_date!: Date | null;
}

UserDietary.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		dietaryId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: 'UserDietary',
		timestamps: false,
	}
);

export { UserDietary };

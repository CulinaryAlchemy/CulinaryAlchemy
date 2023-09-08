import { DataTypes, Model } from 'sequelize';
import { UserXDietaryInterface } from '../../interfaces';
import { sequelize } from '../../services';

class UserDietary
	extends Model<UserXDietaryInterface>
	implements UserXDietaryInterface {
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
		sequelize: sequelize,
		modelName: 'UserDietary',
		timestamps: false,
	}
);

export { UserDietary };

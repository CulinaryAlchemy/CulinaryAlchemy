import { DataTypes, Model } from 'sequelize';
import { RoleInterface } from '../../interfaces';
import { sequelize } from '../../services';

class Role extends Model<RoleInterface> implements RoleInterface {
	id!: number;
	name!: string;
}

Role.init(
	{
		id: {
			primaryKey: true,
			type: DataTypes.INTEGER,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isIn: [['admin', 'user']],
			},
		},
	},
	{
		sequelize: sequelize,
		timestamps: false,
		modelName: 'Roles',
	}
);
export { Role };

import { DataTypes, Model } from 'sequelize';
import { dbSequelize } from '..';

import { RoleInterface } from '../../interfaces';

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
		sequelize: dbSequelize,
		modelName: 'Roles',
	}
);

export { Role };
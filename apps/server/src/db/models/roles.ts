import { DataTypes, Model } from 'sequelize';
import { dbSequelize } from '..';
import { User } from '.';

interface RoleInterface {
	id: number;
	name: string;
}

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
		modelName: 'Role',
	}
);

export { Role, RoleInterface };
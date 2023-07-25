import { DataTypes } from 'sequelize';
import { dbSequelize } from '..';

const Role = dbSequelize.define('roles', {
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
});
export { Role };

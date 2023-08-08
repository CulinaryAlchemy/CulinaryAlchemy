import { Sequelize } from 'sequelize';
import { getEnvironment } from '../services';
const { POSTGRESQL_DB_URI } = getEnvironment()
export const dbSequelize = new Sequelize(POSTGRESQL_DB_URI!, {
	dialect: 'postgres',
	dialectOptions: {
		ssl: true,
		define: {
			timestamps: false,
			charset: 'utf8',
			collate: 'utf8_general_ci',
			foreignKeys: {
				deferrable: true,
			},
		},
	},
});

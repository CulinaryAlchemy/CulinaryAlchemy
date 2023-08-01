import { Sequelize } from 'sequelize';

export const dbSequelize = new Sequelize(process.env.POSTGRESQL_DB_URI!, {
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

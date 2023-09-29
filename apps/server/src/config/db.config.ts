import { Options } from 'sequelize';

function getSslConfig() {
	if (process.env.ENVIRONMENT === 'development') {
		return;
	}

	return { ssl: { require: true, rejectUnauthorized: true } };
}

const logging: boolean = JSON.parse(process.env.ALLOW_DB_LOGGIN as string);

const dbConfig: Options = {
	dialect: 'postgres',
	logging,
	dialectOptions: {
		...getSslConfig(),
		define: {
			timestamps: false,
			charset: 'utf8',
			collate: 'utf8_general_ci',
			foreignKeys: {
				deferrable: true,
			},
		},
	},
};

export { dbConfig };

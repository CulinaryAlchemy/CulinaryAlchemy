import { Options } from 'sequelize';
import { getEnvironment } from '../services';

const { ENVIRONMENT } = getEnvironment();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let sslConfig: any = { require: true };
if (ENVIRONMENT === 'development') {
	sslConfig = { require: true, rejectUnauthorized: false };
}

const dbConfig: Options = {
	dialect: 'postgres',
	dialectOptions: {
		ssl: { ...sslConfig },
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

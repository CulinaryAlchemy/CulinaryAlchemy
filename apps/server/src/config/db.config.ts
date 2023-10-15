import { Options } from 'sequelize';
import { checkEnvironmentEnv } from './index';

function getSslConfig() {
	if(process.env.SSL === undefined){
		throw new Error('missing SSL variable')
	}
	if (!JSON.parse(process.env.SSL) {
		return;
	}

	return { ssl: { require: true, rejectUnauthorized: true } };
}

function getDtabaseConfiguration() {
	checkEnvironmentEnv();
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
	return dbConfig;
}

export { getDtabaseConfiguration };

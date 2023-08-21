import { Sequelize } from 'sequelize';
import { getEnvironment } from '../services';
import { dbConfig } from '../config/db';

const { POSTGRESQL_DB_URI } = getEnvironment();

const sequelize = new Sequelize(POSTGRESQL_DB_URI!, dbConfig);

export { sequelize };

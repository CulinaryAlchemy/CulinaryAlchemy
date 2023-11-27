import { Sequelize } from 'sequelize';
import { getDtabaseConfiguration } from '../config';

const POSTGRESQL_DB_URI = process.env.POSTGRESQL_DB_URI;

const sequelize = new Sequelize(POSTGRESQL_DB_URI!, getDtabaseConfiguration());

export { sequelize };

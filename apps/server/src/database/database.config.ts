import { Sequelize } from 'sequelize';
import { dbConfig } from '../config/db';

const POSTGRESQL_DB_URI = process.env.POSTGRESQL_DB_URI;

const sequelize = new Sequelize(POSTGRESQL_DB_URI!, dbConfig);

export { sequelize };

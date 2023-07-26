import { Sequelize } from 'sequelize';

export const dbSequelize = new Sequelize({
	dialect: 'sqlite',
	storage: './src/db/sequelize.sqlite',
	logging: console.log
});

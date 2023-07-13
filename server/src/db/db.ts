import { Sequelize } from "sequelize";

export const dbSequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './storage/db.sqlite'
});
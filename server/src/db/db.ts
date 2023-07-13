import { Sequelize } from "sequelize";

export const dbSequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '/server/src/db/storage/db.sqlite'
});
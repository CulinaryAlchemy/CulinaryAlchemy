import { getEnvironment } from ".";
import { dbSequelize } from "../config/db";
import { seedDatabaseAdmins } from "../db/default-users";

const { ENVIRONMENT } = getEnvironment()
export const startDatabase = async () => {
    try {
        await dbSequelize.authenticate();
        console.log('Connection with databse has been established successfully.');

        await dbSequelize.sync({ force: true });
        console.log('All models were synchronized successfully.');

        if (ENVIRONMENT === 'production') {
            await seedDatabaseAdmins();
            console.log('Default users have been added to the database.');
        }

        return Promise.resolve()
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        return Promise.reject(typeof error === 'string' ? new Error(error) : error)
    }
}
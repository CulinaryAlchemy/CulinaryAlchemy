// libreries
import express from 'express';
// db
import { dbSequelize } from './db';
// middlewares
import { logsMiddw } from './middlewares';

const app = express();
app.use(express.json());
app.use(logsMiddw);

(async () => {
    try {
        await dbSequelize.authenticate();
        console.log('Connection with databse has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


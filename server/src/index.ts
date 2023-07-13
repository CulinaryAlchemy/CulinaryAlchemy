// libreries
import express from 'express';

// db
import { dbSequelize } from './db';
// routes

const app = express();

(async () => {
    try {
        await dbSequelize.authenticate();
        console.log('Connection with databse has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})()


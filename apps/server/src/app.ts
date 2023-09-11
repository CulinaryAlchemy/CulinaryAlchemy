// libreries
import express from 'express';
import cors from 'cors';

// middlewares
import { logsMiddw } from './middlewares';

// routers
import { appRouter } from './routes';
import { corsConfig } from './config';

// app
const app = express();

app.use(express.json());

app.use(cors(corsConfig));

if (process.env.ENVIRONMENT === 'development') {
	app.use(logsMiddw);
}
// routes
app.use('/', appRouter);

export { app };

import express from 'express';
import cors from 'cors';

// middlewares
import { logsMiddw } from './middlewares';

// routers
import { appRouter } from './routes';

// config
import { corsConfig } from './config';
import { rateLimitConfig } from 'config/reate-limit';

// app
const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(
	express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }),
);

app.use(cors(corsConfig));
app.use(rateLimitConfig);
if (process.env.ENVIRONMENT === 'development') {
	app.use(logsMiddw);
}

// routes
app.use('/', appRouter);

export { app };

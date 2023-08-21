// libreries
import express from 'express';
import cors from 'cors';

// middlewares
import { logsMiddw } from './middlewares';

// routers
import { appRouter } from './routes';
import { getEnvironment } from './services';

// app
const app = express();

app.use(express.json());

app.use(cors());

const { ENVIRONMENT } = getEnvironment();
if (ENVIRONMENT === 'development') {
	app.use(logsMiddw);
}
// routes
app.use('/', appRouter);

export { app };

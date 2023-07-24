// libreries
import express from 'express';
import cors from 'cors';
// db
import { dbSequelize } from './db';

// middlewares
import { logsMiddw } from './middlewares';

// routers
import { authRouter } from './routes/auth';
import { userRouter } from './routes/user';

// PORT
const PORT = process.env.PORT || 3000;

// app
const app = express();

app.use(express.json());

app.use(cors());

app.use(logsMiddw);

// routes
app.use('/auth', authRouter);
app.use('/user', userRouter);
(async () => {
	try {
		await dbSequelize.authenticate();
		console.log('Connection with databse has been established successfully.');

		await dbSequelize.sync();
		console.log('all models syncronized');

		// start server
		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
})();

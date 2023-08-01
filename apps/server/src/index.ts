// libreries
import express from 'express';
import cors from 'cors';
// db
import { dbSequelize } from './db';
import { Role } from './db/models/roles';

// middlewares
import { logsMiddw } from './middlewares';

// routers
import { authRouter } from './routes/auth';
import { userRouter } from './routes/user';
import { User } from './db/models';

// services
import { seedDatabaseAdmins } from './db/default-users';

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
app.get('/keep-alive', (req, res) => {
	setTimeout(() => {
		res.send('alive').end();
	}, 1000);
})
;(async () => {
	try {
		await dbSequelize.authenticate();
		console.log('Connection with databse has been established successfully.');
		
		await Role.sync();

		await User.sync();


		await dbSequelize.sync();
		console.log('all models syncronized');

		await seedDatabaseAdmins();

		// start server
		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
		setInterval(() => {
			fetch('https://culinaryalchemy.onrender.com/keep-alive', {
				method: 'GET'
			}).then(() => {
				console.log('it looks like the server is alive');
			}).catch(() => {
				console.log('the server is dead');
			});
		}, (1000 * 60 * 12));
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
})();

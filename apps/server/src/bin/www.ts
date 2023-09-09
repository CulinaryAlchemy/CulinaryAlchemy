import dotenv from 'dotenv';
dotenv.config();

import { app } from '../app';
import { DatabaseService } from '../services';
import { checkEnvironmentEnv } from '../config';

(async () => {
	// we check all the environment env vars are setted
	checkEnvironmentEnv();

	// PORT
	const PORT = process.env.PORT;
	try {
		await DatabaseService.start();
		// start server
		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
})();

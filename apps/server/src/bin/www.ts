import dotenv from 'dotenv';
dotenv.config();

import { app } from '../app';
import { DatabaseService } from '../services/index';

(async () => {
	// PORT
	const PORT = process.env.PORT || 3000;
	try {
		console.log('before database sync');
		await DatabaseService.start();
		// start server
		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
})();

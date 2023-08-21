import { app } from '../app';
import { getEnvironment, DatabaseService } from '../services/index';
(async () => {
	// PORT
	const { PORT } = getEnvironment();
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

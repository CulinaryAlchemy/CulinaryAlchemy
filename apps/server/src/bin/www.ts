import { app } from '../app';
import { DatabaseService, getEnvironment } from '../services/index';

(async () => {
	// PORT
	const { PORT } = getEnvironment();
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

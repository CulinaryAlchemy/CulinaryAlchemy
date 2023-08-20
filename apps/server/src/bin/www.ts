import { app } from '../app';
import { getEnvironment, startDatabase } from '../services/index';
(async () => {
	// PORT
	const { PORT } = await getEnvironment();
	try {
		await startDatabase();
		// start server
		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
})();

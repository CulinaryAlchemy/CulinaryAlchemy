import { CorsOptions } from 'cors';

const corsConfig: CorsOptions = {
	origin: (origin, next) => {
		if (!origin) {
			new Error('Rejected by cors. No origin detected');
		}

		const whiteList = process.env.ALLOWED_ORIGIN_LIST;

		if (!whiteList) {
			return next(
				new Error(
					'No whiteList found in server variables. Check the .env and corsConfig to detect the error'
				)
			);
		}

		for (const allowedOrigin of whiteList.split(' ')) {
			if (origin?.startsWith(allowedOrigin) ) {
				return next(null, true);
			}
		}

		return next(new Error('Rejected by cors'));
	},
};
export { corsConfig };

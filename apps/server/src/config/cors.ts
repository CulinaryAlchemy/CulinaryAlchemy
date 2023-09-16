import { CorsOptions } from 'cors';

const corsConfig: CorsOptions = {
	origin: (origin, next) => {
		if (!origin) {
			return next(
				new Error(
					'Rejected by cors, the is been an error on the cors configuration. origin value: ' +
						origin
				)
			);
		}

		const whiteList = process.env.ALLOWED_ORIGIN_LIST;

		if (!whiteList) {
			return next(
				new Error(
					'No whiteList found in server variables. Check the corsConfig to detect the error'
				)
			);
		}

		for (const allowedOrigin of whiteList.split(' ')) {
			if (origin.startsWith(allowedOrigin)) {
				return next(null, true);
			}
		}

		return next(new Error('Rejected by cors, origin: ' + origin));
	},
};
export { corsConfig };

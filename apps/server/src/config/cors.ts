import { CorsOptions } from 'cors';

const corsConfig: CorsOptions = {
	origin: (origin, next) => {
		if (!origin) {
			return next(new Error('Rejected by cors, internal server error'));
		}

		const environment = process.env.ENVIRONMENT;

		if (environment === 'development') {
			if (!origin.startsWith('http://localhost')) {
				next(new Error('Not allowed by CORS'));
			}
			return next(null, true);
		}

		if (environment === 'production') {
			if (!origin.startsWith('https://culinary-alchemy-web-app.vercel.app')) {
				next(new Error('Not allowed by CORS'));
			}
			return next(null, true);
		}

		// if the environment is not production or development, we reject the request
		return next(
			new Error('Internal Environment is invalid, rejected by cors.')
		);
	},
};
export { corsConfig };

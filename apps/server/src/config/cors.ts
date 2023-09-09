import { CorsOptions } from 'cors';

const origin =
	process.env.ENVIRONMENT === 'development'
		? '*'
		: 'https://culinary-alchemy-web-app.vercel.app/';

const corsConfig: CorsOptions = {
	origin,
};
export { corsConfig };

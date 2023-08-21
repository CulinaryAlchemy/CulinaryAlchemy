import dotenv from 'dotenv';

dotenv.config();

export function getEnvironment() {
	const PORT = process.env.PORT;
	const SECRET = process.env.JWT_SECRET;
	const ENVIRONMENT = process.env.ENVIRONMENT;
	const POSTGRESQL_DB_URI = process.env.POSTGRESQL_DB_URI;
	const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
	const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
	const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

	const missingVariables: string[] = [];
	const wrongVariables: string[] = [];
	if (!PORT) {
		missingVariables.push('PORT');
	}
	if (!SECRET) {
		missingVariables.push('SECRET');
	}
	if (!ENVIRONMENT) {
		missingVariables.push('ENVIRONMENT');
	}
	if (!POSTGRESQL_DB_URI) {
		missingVariables.push('POSTGRESQL_DB_URI');
	}
	if (!CLOUDINARY_CLOUD_NAME) {
		missingVariables.push('CLOUDINARY_CLOUD_NAME');
	}
	if (!CLOUDINARY_API_KEY) {
		missingVariables.push('CLOUDINARY_API_KEY');
	}
	if (!CLOUDINARY_API_SECRET) {
		missingVariables.push('CLOUDINARY_API_SECRET');
	}
	if (Number.isNaN(Number(PORT))) {
		wrongVariables.push('PORT');
	}

	if (missingVariables.length > 0) {
		const missingVariablesString = missingVariables.join(', ');
		throw new Error(`Missing environment variables ${missingVariablesString}`);
	}
	if (wrongVariables.length > 0) {
		const wrongVariablesString = wrongVariables.join(', ');
		console.log(wrongVariablesString);
		throw new Error(`wrong environment variables ${wrongVariablesString}`);
	}

	return { PORT, SECRET, ENVIRONMENT, POSTGRESQL_DB_URI };
}
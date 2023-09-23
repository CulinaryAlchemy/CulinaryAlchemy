const checkEnvironmentEnv = () => {
	const environmentVars = [
		'JWT_SECRET',
		'PORT',
		'ENVIRONMENT',
		'POSTGRESQL_DB_URI',
		'ADMIN_PASSWORD',
		'TEST_PASSWORD',
		'CLOUDINARY_API_KEY',
		'CLOUDINARY_API_SECRET',
		'CLOUDINARY_CLOUD_NAME',
		'ALLOWED_ORIGIN_LIST',
	];

	// we check all environments variables are setted
	for (const env of environmentVars) {
		if (!process.env[env])
			throw new Error(`Missing environment variable: ${env}`);
	}
};

export { checkEnvironmentEnv };

import { UserProvider } from '../providers/user';

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
		'ALLOW_DB_LOGGIN',
		'SSL',
	];

	// we check all environments variables are setted
	for (const env of environmentVars) {
		if (!process.env[env])
			throw new Error(`Missing environment variable: ${env}`);
	}
};
async function showEnvironmet() {
	console.log(`you're running the server in ${process.env.ENVIRONMENT} mode`);
	console.log(
		`your allowed origins start with: ${process.env.ALLOWED_ORIGIN_LIST?.split(
			' '
		)}`
	);
	if (process.env.ENVIRONMENT === 'development') {
		const testUser = await UserProvider.getUser.byUsername('test123');
		console.log(
			`the test user user username is: ${testUser?.username}, and the password is: ${process.env.TEST_PASSWORD}`
		);
		const adminUser = await UserProvider.getUser.byUsername('culinaryalchemy');
		console.log(
			`the admin user username is: ${adminUser?.username}, and the password is: ${process.env.ADMIN_PASSWORD}`
		);
		console.log(`your db uri is: ${process.env.POSTGRESQL_DB_URI}`);

		console.log(
			'the logs listed above are outputed because you are running th server in developmnet mode, this doesnt shows on production'
		);
	}
}
export { checkEnvironmentEnv, showEnvironmet };

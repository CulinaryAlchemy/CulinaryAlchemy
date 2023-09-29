import { UserProvider } from '../providers/user';

const checkEnvironmentEnv = async () => {
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
		'ALLOW_DB_LOGGIN'
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
			`the test user is: username: ${testUser?.username} password: ${process.env.TEST_PASSWORD}`
		);
		const adminUser = await UserProvider.getUser.byUsername('culinaryalchemy');
		console.log(
			`the admin user is: username: ${adminUser?.username} password: ${process.env.ADMIN_PASSWORD}`
		);
	}
}
export { checkEnvironmentEnv, showEnvironmet };

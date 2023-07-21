import { Strategy, ExtractJwt } from 'passport-jwt';

import { UserProvider } from '../providers/user';
import passport from 'passport';

const secret = process.env.JWT_SECRET || 'secret';

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: secret,
};

const jwtVerify = async (payload: any, done: any) => {
	try {
		if (payload.exp < Date.now()) {
			return done(null, false);
		}

		let userFromDb: any = null;
		await UserProvider.getUser
			.ById(payload.sub)
			.then((user) => (userFromDb = { user }));

		if (!userFromDb) {
			return done(null, false, { message: userFromDb });
		}
		done(null, userFromDb);
	} catch (error) {
		return done(null, false);
	}
};

const jwtStrategy = new Strategy(jwtOptions, jwtVerify);

passport.use('jwt', jwtStrategy);

export default passport;

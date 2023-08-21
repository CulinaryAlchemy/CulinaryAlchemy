import { Strategy, ExtractJwt } from 'passport-jwt';

import { UserProvider } from '../../providers/user';
import passport, { DoneCallback } from 'passport';

const secret = process.env.JWT_SECRET;

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: secret,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const jwtVerify = async (payload: any, done: DoneCallback) => {
	try {
		if (payload.exp < Date.now()) {
			return done(null, false);
		}

		const userFromDb = await UserProvider.getUser.ById(payload.sub, true);

		if (!userFromDb) {
			return done(null, false);
		}

		done(null, userFromDb);
	} catch (error) {
		return done(null, false);
	}
};

const jwtStrategy = new Strategy(jwtOptions, jwtVerify);

passport.use('jwt', jwtStrategy);

const passportMiddleware = passport.authenticate('jwt', { session: false });

export { passportMiddleware };

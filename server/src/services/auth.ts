import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import bcrypt from "bcrypt";

import { UserProvider } from "../providers/user";
import passport from "passport";

const secret = process.env.JWT_SECRET || "secret";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

const jwtVerify = async (payload: any, done: any) => {
  try {
    if (payload.exp < Date.now()) {
      return done(null, false, { message: "token expired" });
    }

    let user: any = null;
    await UserProvider.getUser
      .ById(payload.sub)
      .then((user) => (user = user))
      .catch(() => (user = null));

    if (!user) {
      return done(null, false, { message: "user not found" });
    }

    if (user.password !== payload.password) {
      return done(null, false, { message: "wrong credentials" });
    }

    done(null, user);
  } catch (error) {
    return done(null, false, { message: "internal server error" });
  }
};

const jwtStrategy = new Strategy(jwtOptions, jwtVerify);

passport.use(jwtStrategy);

export { passport };

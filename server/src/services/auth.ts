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

    const user = await UserProvider.getUser.ById(payload.sub);

    if (!user) {
      return done(null, false, { message: "user not found" });
    }

    done(null, user);
  } catch (error) {
    return done(null, false, { message: "internal server error" });
  }
};

const jwtStrategy = new Strategy(jwtOptions, jwtVerify);

passport.use(jwtStrategy);

export { passport };

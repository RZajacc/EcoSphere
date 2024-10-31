import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";

let opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.MYSECRETKEY as string,
};

passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    console.log("PAYLOAD", jwt_payload);
  })
);

export default passport;

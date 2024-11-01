import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import * as db from "../db/index";

let opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.MYSECRETKEY as string,
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      // Try to find a user in the database
      const queryResult = await db.query(
        `SELECT * FROM users WHERE user_id='${jwt_payload.sub}'`
      );
      // If user is there return it
      if (queryResult && queryResult.rowCount !== 0) {
        const user = queryResult.rows[0];
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      console.log("Something went wront with validation");
      return done(error, false);
    }
    // User.findOne({ id: jwt_payload.sub }, function (err, user) {
    //   if (err) {
    //     return done(err, false);
    //   }
    //   if (user) {
    //     return done(null, user);
    //   } else {
    //     return done(null, false);
    //     // or you could create a new account
    //   }
    // });
  })
);

export default passport;

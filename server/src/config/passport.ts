import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import * as db from "../db/index";
import { JwtPayload } from "jsonwebtoken";
import { QueryResult } from "pg";

let opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.MYSECRETKEY as string,
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload: JwtPayload, done) => {
    try {
      // Try to find a user in the database
      const queryResult: void | QueryResult<{
        user_id: string;
        user_name: string;
        email: string;
      }> = await db.query(
        `SELECT user_id, user_name, email FROM users WHERE user_id='${jwt_payload.sub}'`
      );
      // If user is there return it
      if (queryResult && queryResult.rowCount !== 0) {
        const user = queryResult.rows[0];
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passport;

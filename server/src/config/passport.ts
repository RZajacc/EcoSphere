import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import * as db from "../db/index";
import { JwtPayload } from "jsonwebtoken";
import { QueryResult } from "pg";

let opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.MYSECRETKEY as string,
};

type UserQuery = {
  user_id: string;
  user_name: string;
  email: string;
  img_url: string;
  img_width: number | null;
  img_height: number | null;
  img_format: string | null;
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload: JwtPayload, done) => {
    try {
      // Try to find a user in the database
      const queryResult: void | QueryResult<UserQuery> = await db.query(
        `SELECT
          u.user_id,
          u.user_name,
          u.email,
          COALESCE(i.imageurl, NULL) AS img_url,
          COALESCE(i.width, NULL) AS img_width,
          COALESCE(i.height, NULL) AS img_height,
          COALESCE(i.format, NULL) AS img_format
        FROM
          users u
        LEFT JOIN
          images i
        ON
          u.image_id= i.image_id
        WHERE u.user_id='${jwt_payload.sub}'`
      );
      // If user is there return it
      if (queryResult && queryResult.rowCount !== 0) {
        // User from a query
        const queriedUser = queryResult.rows[0];
        // User with more desired structure
        const user = {
          user_id: queriedUser.user_id,
          user_name: queriedUser.user_name,
          email: queriedUser.email,
          image: {
            public_url: queriedUser.img_url,
            width: queriedUser.img_width,
            height: queriedUser.img_height,
            format: queriedUser.img_format,
          },
        };
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

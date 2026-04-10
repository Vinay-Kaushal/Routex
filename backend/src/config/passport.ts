import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User";
import dotenv from "dotenv" ;
import path from "path";

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/api/auth/google/callback",
    },
    async (_accessToken, _refreshToken, profile, done) => {
      const email = profile.emails?.[0].value;

      let user = await User.findOne({ email });

      if (!user) {
        user = await User.create({
          email,
          name: profile.displayName,
          googleId: profile.id,
        });
      }

      return done(null, user);
    }
  )
);


require("dotenv").config({ path: ".env.local" });
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const connection = require("./db/db");

module.exports = (passport) => {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/v1/auth/google/callback",
        passReqToCallback: true,
      },
      async (request, accessToken, refreshToken, profile, done) => {
        try {
          connection.query(
            `SELECT * FROM accounts WHERE googleID = '${profile.id}'`,
            function (err, user) {
              if (err) return done(err);
              if (user.length) {
                return done(null, user);
              } else {
                connection.query(
                  `INSERT INTO accounts
              (googleID,name, email,googleToken,profilepic) 
              VALUES 
              ('${profile.id}','${profile.displayName}','${profile.email}','${accessToken}','${profile.picture}')`,
                  (err) => {
                    if (err) {
                      return done(err);
                    }
                    return done(null, profile);
                  }
                );
              }
            }
          );
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
};

import { MockAuthenticationService } from "../areas/authentication/services";
import passport from "passport";
import PassportConfig from "../areas/authentication/config/PassportConfig";

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  // Use PassportConfig class here

  const localLogin = new PassportConfig(new MockAuthenticationService());
  passport.use(localLogin.strategy);

  passport.serializeUser(function (user, done) {
    done(null, localLogin.user.email);
  });

  passport.deserializeUser(async (email, done) => {
    let user = await localLogin.auth_service.findUserByEmail(localLogin.user.email);
    if (user) {
      done(null, user);
    } else {
      done({ message: "User not found" }, null);
    }
  });
};

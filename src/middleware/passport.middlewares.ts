import { AuthenticationServiceMongoDb, AuthenticationServiceMysql } from "../areas/authentication/services";
import passport from "passport";
import PassportConfig from "../areas/authentication/config/PassportConfig";
import IUser from "../interfaces/user.interface";

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  // Use PassportConfig class here
  passport.serializeUser(function (user: IUser, done) {
    done(null, user.email);
  });

  passport.deserializeUser(async (email: string, done) => {
    let user = await localLogin.auth_service.findUserByEmail(email);
    if (user) {
      done(null, user);
    } else {
      done({ message: "User not found" }, null);
    }
  });

  const localLogin = new PassportConfig(new AuthenticationServiceMysql());
  passport.use(localLogin.strategy);
};

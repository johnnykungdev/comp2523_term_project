import passport from "passport";
import PassportConfig from "../areas/authentication/config/PassportConfig";

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
  // Use PassportConfig class here
    // create PassportConfig obj and pass its config
    // pp should work if reference type?
    // passport.use(localLogin);
};

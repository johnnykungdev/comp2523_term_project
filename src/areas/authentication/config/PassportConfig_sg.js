//----------------------------------------
// TODO:                                 |
//----------------------------------------
// 🚀 Configure Passport.js Local Authentication in this file

import { MockAuthenticationService } from "../services";

//    Ensure code is fully typed wherever possible (unless inference can be made)
import passport from "passport";

import * as passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;

export default class PassportConfig {
    private _passport;
    private _strategy;


    constructor(auth_service: MockAuthenticationService) {
        this._passport = passport;
        this._strategy = new LocalStrategy(
            {
              usernameField: "email",
              passwordField: "password",
            },
            async (email, password, done) => {

                console.log('inside passportconfig');
                
              const user = await auth_service.getUserByEmailAndPassword(email, password);
              return user
                ? done(null, user)
                : done(null, false, {
                    message: "Your login details are not valid. Please try again",
                  });
            }
          );

          this._passport.serializeUser(function (user, done) {
            done(null, user.email);
          });
          
          this._passport.deserializeUser(function (email, done) {
            let user = auth_service.findUserByEmail(email);
            if (user) {
              done(null, user);
            } else {
              done({ message: "User not found" }, null);
            }
          });

          this._passport.use(this._strategy);
    }

    
    public get passport() {
        return this._passport;
    }
    
    public get strategy() {
        return this._strategy;
    }

}


import express, { Request, Response, NextFunction, Router } from "express";
import IController from "../../../interfaces/controller.interface";
import { IAuthenticationService } from "../services";
import passport from "passport";
import EmailAlreadyExistsException from "../../../exceptions/EmailAlreadyExists";

class AuthenticationController implements IController {
  public path = "/auth";
  public router = Router();
  private _auth_service: IAuthenticationService;

  constructor(service: IAuthenticationService) {
    this.initializeRoutes();
    this._auth_service = service;
  }

  private ensureUnauthenticated = function (req: Request, res: Response, next: NextFunction) {
    if (typeof req.user != "undefined") {
      res.redirect("/posts");
    } else {
      return next();
    }
  };

  private initializeRoutes() {
    this.router.get(`${this.path}/register`, this.ensureUnauthenticated, this.showRegistrationPage);
    this.router.post(`${this.path}/register`, this.registration);
    this.router.get(`${this.path}/login`, this.ensureUnauthenticated, this.showLoginPage);
    // FAKING LOGIN, TO REMOVE ONCE DONE and uncomment above instead
    // this.router.get(`${this.path}/login`, this.login);

    this.router.post(`${this.path}/login`, this.login);
    this.router.get(`${this.path}/logout`, this.logout);
  }

  private showLoginPage = (req: Request, res: express.Response) => {
    let messages: string[] = [];
    let err_msg = req.flash("error");
    let reg_success_msg = req.flash("info");

    console.log(`err msg ${err_msg} length ${err_msg.length}`);

    if (err_msg.length > 0) {
      messages = err_msg;
    } else if (reg_success_msg.length > 0) {
      messages = reg_success_msg;
    }

    res.render("authentication/views/login", { messages: messages });
  };

  private showRegistrationPage = (_: express.Request, res: express.Response) => {
    res.render("authentication/views/register");
  };

  private login = (req: express.Request, res: express.Response, next) => {
    // FAKE LOGIN, TO REMOVE ONCE DONE, and use form instead
    // req.body = { email: "james123@gmail.com", password: "james123" };

    passport.authenticate("local", function (err, user) {
      if (err) {
        console.log("authentication error");

        return next(err); // will generate a 500 error
      }
      req.login(user, (loginErr) => {
        if (loginErr) {
          return next(loginErr);
        }
        return res.redirect("/posts");
      });
    })(req, res, next);
  };
  private registration = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // need some more form validation here, like for pw

    const user = await this._auth_service.createUser(req.body);

    if (user) {
      req.flash("info", `Sucessful signup, ${user.username}. Please login now`);
    } else {
      next(new EmailAlreadyExistsException(req.body.email, req.body.username));
    }

    res.redirect("/auth/login");
  };
  private logout = async (req: express.Request, res: express.Response) => {
    req.logout();
    res.redirect("/auth/login");
  };
}

export default AuthenticationController;

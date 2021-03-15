import express, { Request, Response, NextFunction, Router } from "express";
import IController from "../../../interfaces/controller.interface";
import { IAuthenticationService } from "../services";
import passport from "passport";

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
    this.router.post(`${this.path}/login`, this.login);
    this.router.get(`${this.path}/logout`, this.logout);
  }

  private showLoginPage = (req: express.Request, res: express.Response) => {
    let err_msg = req.flash("error");
    let reg_success_msg = req.flash("info");

    console.log("reg success");

    console.log(reg_success_msg);

    res.render("authentication/views/login", { message: err_msg, reg_success_msg });
  };

  private showRegistrationPage = (_: express.Request, res: express.Response) => {
    res.render("authentication/views/register");
  };

  private login = (req: express.Request, res: express.Response, next) => {
    passport.authenticate("local", {
      successRedirect: "/posts",
      failureRedirect: "/auth/login",
      failureFlash: true,
    })(req, res, next);
  };
  private registration = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const user = this._auth_service.createUser(req.body);
    // need some more form validation here, like for pw
    console.log("user user");
    console.log(user);

    // if (user) {
    // put message here
    req.flash("info", "Signup success");
    res.redirect("/auth/login");
    // }
  };
  private logout = async (req: express.Request, res: express.Response) => {};
}

export default AuthenticationController;

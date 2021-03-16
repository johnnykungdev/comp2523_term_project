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
    passport.authenticate("local", {
      successRedirect: "/posts",
      failureRedirect: "/auth/login",
      failureFlash: true,
    })(req, res, next);
  };
  private registration = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // need some more form validation here, like for pw

    const user = await this._auth_service.createUser(req.body);

    // if (user) {
    // put message here
    req.flash("info", `Sucessful signup, ${user[0].username}. Please login now`);
    res.redirect("/auth/login");
    // }
  };
  private logout = async (req: express.Request, res: express.Response) => {
    req.logout();
    res.redirect("/auth/login");
  };
}

export default AuthenticationController;

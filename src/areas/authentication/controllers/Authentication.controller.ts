import express from "express";
import IController from "../../../interfaces/controller.interface";
import { IAuthenticationService } from "../services";
import passport from "passport";

class AuthenticationController implements IController {
  public path = "/auth";
  public router = express.Router();

  constructor(service: IAuthenticationService) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/register`, this.showRegistrationPage);
    this.router.post(`${this.path}/register`, this.registration);
    this.router.get(`${this.path}/login`, this.showLoginPage);
    this.router.post(`${this.path}/login`, this.login);
    this.router.get(`${this.path}/logout`, this.logout);
  }

  private showLoginPage = (req: express.Request, res: express.Response) => {
    let err_msg = req.flash("error");
    res.render("authentication/views/login", { message: err_msg });
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
  private registration = async (req: express.Request, res: express.Response, next: express.NextFunction) => {};
  private logout = async (req: express.Request, res: express.Response) => {};
}

export default AuthenticationController;

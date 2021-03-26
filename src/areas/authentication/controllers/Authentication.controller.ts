import { Request, Response, NextFunction, Router } from "express";
import IController from "../../../interfaces/controller.interface";
import { IAuthenticationService } from "../services";
import passport from "passport";
import EmailAlreadyExistsException from "../../../exceptions/EmailAlreadyExists";
import HttpException from "../../../exceptions/HttpException";

class AuthenticationController implements IController {
  public path = "/auth";
  public router = Router();
  private _auth_service: IAuthenticationService;

  constructor(service: IAuthenticationService) {
    this.initializeRoutes();
    this._auth_service = service;
  }

  private ensureAuthenticated = function (req: Request, res: Response, next: NextFunction) {
    if (typeof req.user == "undefined") {
      res.redirect("/auth/login");
    } else {
      return next();
    }
  };

  private initializeRoutes() {
    this.router.get(`${this.path}/register`, this.showRegistrationPage);
    this.router.post(`${this.path}/register`, this.registration);
    this.router.get(`${this.path}/login`, this.showLoginPage);
    this.router.post(`${this.path}/login`, this.login);
    this.router.get(`${this.path}/logout`, this.logout);
    this.router.get(`${this.path}/logout`, this.logout);
    this.router.get(`*`, this.ensureAuthenticated);
  }

  private showLoginPage = (req: Request, res: Response) => {
    res.render("authentication/views/login", { message: req.flash("info") });
  };

  private showRegistrationPage = (req: Request, res: Response) => {
    res.render("authentication/views/register", { message: req.flash("info") });
  };

  // 🔑 These Authentication methods needs to be implemented by you
  private login = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", function (err, user) {
      if (err) {
        return next(err);
      }
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
      });
      return res.redirect("/posts");
    })(req, res, next);
  };

  private registration = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this._auth_service.createUser(req.body);
      if (user) {
        req.flash("info", `Sign up success, ${user.username}. Please login now`);
        res.redirect("/auth/login");
      } else {
        next(new EmailAlreadyExistsException(req.body.email, req.body.username));
      }
    } catch (error) {
      next(new HttpException(500, error));
    }
  };
  private logout = async (req: Request, res: Response) => {
    req.logout();
    res.redirect("/auth/login");
  };
}

export default AuthenticationController;

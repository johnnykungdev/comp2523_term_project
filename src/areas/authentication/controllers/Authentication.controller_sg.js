import express from "express";
import IController from "../../../interfaces/controller.interface";
import { IAuthenticationService } from "../services";
import PassportConfig from "../config/PassportConfig";


class AuthenticationController implements IController {
  public path = "/auth";
  public router = express.Router();


  private _ppConfig: PassportConfig;

  constructor(service: IAuthenticationService) {
    this._ppConfig = new PassportConfig(service);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/register`, this.showRegistrationPage);
    this.router.post(`${this.path}/register`, this.registration);
    this.router.get(`${this.path}/login`, this.showLoginPage);
    this.router.post(`${this.path}/login`, this.login);
    // this.router.post(`${this.path}/login`, this._ppConfig.passport.authenticate("local", {
    //   successRedirect: "/posts",
    //   failureRedirect: "/auth/login",
    // }));

    this.router.get(`${this.path}/logout`, this.logout);
  }

  private showLoginPage = (_: express.Request, res: express.Response) => {
    res.render("authentication/views/login");
  };

  private showRegistrationPage = (_: express.Request, res: express.Response) => {
    res.render("authentication/views/register");
  };

  // 🔑 These Authentication methods needs to be implemented by you
  private login = (req: express.Request, res: express.Response) => {    
    this._ppConfig.passport.authenticate("local", (_,user) => {
        // user send by serialize.
        req.login(user, (err) => {
          if(err) {
            res.redirect(`${this.path}/login`)
          }
          else {
            res.redirect("/posts")
          }
          
        });
    })(req, res)
  };
  private registration = async (req: express.Request, res: express.Response, next: express.NextFunction) => {};
  private logout = async (req: express.Request, res: express.Response) => {};
}

export default AuthenticationController;

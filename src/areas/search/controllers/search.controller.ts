import { Request, Response, NextFunction, Router } from "express";
import IController from "../../../interfaces/controller.interface";
import IPost from "../../../interfaces/post.interface";
import IUser from "../../../interfaces/user.interface";

class SearchController implements IController {
  public path = "/search";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private ensureAuthenticated = function (req: Request, res: Response, next: NextFunction) {
    if (typeof req.user == "undefined") {
      res.redirect("/auth/login");
    } else {
      return next();
    }
  };

  private initializeRoutes() {
    this.router.get(this.path, this.ensureAuthenticated, this.search);
  }

  private search(req: Request, res: Response, next: NextFunction) {
    console.log(req.query.query);
  }
}

export default SearchController;

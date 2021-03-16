import { Request, Response, NextFunction, Router } from "express";
import { PostHelper } from "../../../model/helpers/PostHelper";
import { UserHelper } from "../../../model/helpers/UserHelper";
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
    const query = req.query.query;
    const userList: IUser[] = UserHelper.search([{ username: query }]);
    const postList: IPost[] = PostHelper.search([{ message: query }]);
    const current_user = req.user;

    console.log("userList");
    console.log(userList);

    console.log("postList");
    console.log(postList);

    res.render("search/views/search", { userList, postList, current_user });
  }
}

export default SearchController;

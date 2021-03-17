import { Request, Response, NextFunction, Router } from "express";
import { PostHelper } from "../../../model/helpers/PostHelper";
import { UserHelper } from "../../../model/helpers/UserHelper";
import { InteractHelper } from "../../../model/helpers/InteractHelper";
import IController from "../../../interfaces/controller.interface";
import IPost from "../../../interfaces/post.interface";
import IUser from "../../../interfaces/user.interface";

class SearchController implements IController {
  public path = "/interact";
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
    this.router.get(`${this.path}/search`, this.ensureAuthenticated, this.search);
    this.router.post(`${this.path}/follow`, this.ensureAuthenticated, this.follow_action);

    this.router.post(`${this.path}/repost`, this.ensureAuthenticated, this.repost);
  }

  private search(req: Request, res: Response, next: NextFunction) {
    const query = req.query.query;
    const userList: IUser[] = UserHelper.search([{ username: query }]);
    const postList: IPost[] = PostHelper.search([{ message: query }]);
    const current_user = req.user;

    // console.log("userList");
    // console.log(userList);

    // console.log("postList");
    // console.log(postList);

    res.render("interact/views/search", { userList, postList, current_user });
  }

  private async follow_action(req: Request, res: Response, next: NextFunction) {
    // console.log(req.body); //{ unfollow_user: 'james123' }
    // console.log(UserHelper.select([{ username: req.user.username }]));
    // console.log("following");
    // console.log(UserHelper.select([{ username: req.user.username }])[0].following);

    if (req.user.username != Object.values(req.body)[0]) {
      if (Object.keys(req.body)[0] == "follow_user") {
        await InteractHelper.follow(req.user.username, Object.values(req.body)[0]);
      } else {
        await InteractHelper.unfollow(req.user.username, Object.values(req.body)[0]);
      }
    }

    res.redirect("back");
  }

  private async repost(req: Request, res: Response, next: NextFunction) {
    // console.log("repost repost");
    // console.log(req.body);
    // console.log(req.user);
    console.log("where is the form?");

    console.log(req.body);

    await InteractHelper.repost(req.user, req.body.username, req.body.post_id);

    // res.redirect("back");
    res.end();
  }
}

export default SearchController;

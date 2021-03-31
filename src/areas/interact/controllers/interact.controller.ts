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
    this.router.post(`${this.path}/like`, this.ensureAuthenticated, this.like);
    this.router.get(`${this.path}/notifications`, this.ensureAuthenticated, this.notifications);
  }

  private async notifications(req: Request, res: Response, next: NextFunction) {
    console.log("notifications notifications");

    const user = req.user as IUser;
    let notifications = UserHelper.select([{ username: user.username }])[0].notifications;
    notifications.sort((a, b) => {
      var dateA = new Date(a.createdAt);
      var dateB = new Date(b.createdAt);
      return dateB - dateA;
    });
    res.send(notifications);
  }

  private async like(req: Request, res: Response, next: NextFunction) {
    const like_notice = {
      poster_username: req.body.poster_username,
      post_id: req.body.post_id,
      current_user: req.user.username,
    };

    await PostHelper.like(like_notice);

    PostHelper.addNotification(like_notice, "liked");

    res.redirect("back");
  }

  private search(req: Request, res: Response, next: NextFunction) {
    const query = req.query.query;
    const userList: IUser[] = UserHelper.search([{ username: query }]);
    const postList: IPost[] = PostHelper.search([{ message: query }]);
    const user = req.user;

    // console.log("userList");
    // console.log(userList);

    // console.log("postList");
    // console.log(postList);

    res.render("interact/views/NEW_VIEW/search", { userList, postList, user });
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
    await InteractHelper.repost(req.user, req.body.username, req.body.post_id);

    // res.redirect("back");
    const repost_notice = {
      poster_username: req.body.username,
      post_id: req.body.post_id,
      current_user: req.user.username,
    };

    PostHelper.addNotification(repost_notice, "reposted");

    res.end();
  }
}

export default SearchController;

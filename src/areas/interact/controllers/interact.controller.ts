import { Request, Response, NextFunction, Router } from "express";
import { PostHelper } from "../../../model/helpers/PostHelper";
import { UserHelper } from "../../../model/helpers/UserHelper";
import { InteractHelper } from "../../../model/helpers/InteractHelper";
import IController from "../../../interfaces/controller.interface";
import { InteractService } from "../services";

import IPost from "../../../interfaces/post.interface";
import IUser from "../../../interfaces/user.interface";

class SearchController implements IController {
  public path = "/interact";
  public router = Router();
  public _interact_service: InteractService;

  constructor(interact_service: InteractService) {
    this.initializeRoutes();
    this._interact_service = interact_service;
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
    const notifications = await this._interact_service.notifications(req,res,next);
    res.send(notifications);
  }

  private async like(req: Request, res: Response, next: NextFunction) {
    await this._interact_service.like(req,res,next);
    res.redirect("back");
  }

  private async search(req: Request, res: Response, next: NextFunction) {
    const result = await this._interact_service.search(req,res,next);
    let userList = result.userList;
    let postList = result.postList;

    // res.render("interact/views/NEW_VIEW/search", { userList, postList, user });
    res.render("interact/views/NEW_VIEW/search", { userList, postList, req.user });

  }

  private async follow_action(req: Request, res: Response, next: NextFunction) {

    await this._interact_service.follow_action(req, res, next);

    res.redirect("back");
  }

  private async repost(req: Request, res: Response, next: NextFunction) {

    await this._interact_service.repost(req,res, next);

    res.end();
  }
}

export default SearchController;

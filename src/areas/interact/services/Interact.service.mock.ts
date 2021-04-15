import  InteractService from "./InteractService";
import { Request, Response, NextFunction, Router } from "express";
import { PostHelper } from "../../../model/helpers/PostHelper";
import { UserHelper } from "../../../model/helpers/UserHelper";
import { InteractHelper } from "../../../model/helpers/InteractHelper";
import IController from "../../../interfaces/controller.interface";
import IPost from "../../../interfaces/post.interface";
import IUser from "../../../interfaces/user.interface";

export class InteractServiceMock implements InteractService { 


     async notifications(req: Request, res: Response, next: NextFunction) {
        console.log("notifications notifications");
    
        const user = req.user as IUser;
        let notifications = UserHelper.select([{ username: user.username }])[0].notifications;
        notifications.sort((a, b) => {
          var dateA = new Date(a.createdAt);
          var dateB = new Date(b.createdAt);
          return dateB.getTime() - dateA.getTime();
        });
        // res.send(notifications);
        return notifications;
      }
    
       async like(req: Request, res: Response, next: NextFunction) {
        const user = req.user as IUser;
        const like_notice = {
          poster_username: req.body.poster_username,
          post_id: req.body.post_id,
          current_user: user.username,
        };
    
        await PostHelper.like(like_notice);
    
        PostHelper.addNotification(like_notice, "liked");
    
        res.redirect("back");
      }
    
       search(req: Request, res: Response, next: NextFunction) {
        const query = req.query.query;
        const userList: IUser[] = UserHelper.search([{ username: query }]);
        const postList: IPost[] = PostHelper.search([{ message: query }]);

        return {userList: userList, postList: postList};
      }
    
       async follow_action(req: Request, res: Response, next: NextFunction) {
        const user = req.user as IUser;
        if (user.username != Object.values(req.body)[0]) {
          if (Object.keys(req.body)[0] == "follow_user") {
            await InteractHelper.follow(user.username, Object.values(req.body)[0]);
          } else {
            await InteractHelper.unfollow(user.username, Object.values(req.body)[0]);
          }
        }
    
        return;
      }
    
       async repost(req: Request, res: Response, next: NextFunction) {
        await InteractHelper.repost(req.user, req.body.username, req.body.post_id);
        const user = req.user as IUser;
    
        // res.redirect("back");
        const repost_notice = {
          poster_username: req.body.username,
          post_id: req.body.post_id,
          current_user: user.username,
        };
    
        PostHelper.addNotification(repost_notice, "reposted");
    
        return;
      }
}
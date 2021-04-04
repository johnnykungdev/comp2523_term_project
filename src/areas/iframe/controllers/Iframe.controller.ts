import express, { Request, Response, NextFunction, Router } from "express";
import IController from "../../../interfaces/controller.interface";
import { DbHelper } from "../../../model/helpers/dbHelper";

class IframeController implements IController {
  public path = "/iframe";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/posts`, this.allPosts);
    this.router.post(`${this.path}/post`, this.createPost);
    this.router.get(`${this.path}/post/:post_id`, this.singlePost);
  }

  private allPosts = (req: express.Request, res: express.Response) => {
    const user = DbHelper.select([{ username: "guest_user" }]);
    const posts = user[0].posts;

    posts.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB.getTime() - dateA.getTime();
    });

    res.render("iframe/views/posts", { posts, user });
  };

  private singlePost = (req: express.Request, res: express.Response) => {
    const arr = [{ users: { username: "guest_user" } }, { posts: { id: req.params.post_id } }];
    const post = DbHelper.recurseSelect(arr);
    const user = DbHelper.select([{ username: "guest_user" }]);
    res.render("iframe/views/post", { post, user });
  };

  private createPost = (req: express.Request, res: express.Response) => {
    const arr = [{ users: { username: "guest_user" } }];
    let user = DbHelper.recurseSelect(arr);
    user.posts.push({
      id: req.body.oop_post_id,
      userId: "3",
      message: req.body.oop_post_content,
      createdAt: new Date(),
      likes: 0,
      reposts: 0,
      comments: 0,
      commentList: [],
    });

    res.end();
  };
}

export default IframeController;

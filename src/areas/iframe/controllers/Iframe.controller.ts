import express, { Request, Response, NextFunction, Router } from "express";
import IController from "../../../interfaces/controller.interface";
import { database } from "./iframeDB";

class IframeController implements IController {
  public path = "/iframe";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/index`, this.allPosts);
    this.router.get(`${this.path}/post`, this.singlePost);
  }

  private allPosts = (req: express.Request, res: express.Response) => {
    const user = database.users[0];
    const posts = user.posts;

    posts.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB.getTime() - dateA.getTime();
    });

    res.render("iframe/views/posts", { posts, user });
  };

  private singlePost = (req: express.Request, res: express.Response) => {
    const post = database.users[0].posts[0];
    const user = database.users[0];
    res.render("iframe/views/post", { post, user });
  };
}

export default IframeController;

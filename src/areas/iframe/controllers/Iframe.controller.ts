import express, { Request, Response, NextFunction, Router } from "express";
import IController from "../../../interfaces/controller.interface";

class IframeController implements IController {
  public path = "/iframe";
  public router = Router();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/posts`, this.allPosts);
    this.router.get(`${this.path}/post`, this.singlePost);
  }

  private allPosts = (req: express.Request, res: express.Response) => {
    console.log("allPosts called");

    res.render("iframe/views/posts");
  };

  private singlePost = (req: express.Request, res: express.Response) => {};
}

export default IframeController;

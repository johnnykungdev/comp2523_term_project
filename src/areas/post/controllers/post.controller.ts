import { Request, Response, NextFunction, Router } from "express";
import IController from "../../../interfaces/controller.interface";
import IPostService from "../services/IPostService";
import { post } from "../../../model/fakeDB";
import { v4 as uuidv4 } from "uuid";
import IPost from "../../../interfaces/post.interface";

class PostController implements IController {
  public path = "/posts";
  public router = Router();
  private _postService: IPostService;

  constructor(postService: IPostService) {
    this.initializeRoutes();
    this._postService = postService;
  }

  private ensureAuthenticated = function (req: Request, res: Response, next: NextFunction) {
    if (typeof req.user == "undefined") {
      res.redirect("/auth/login");
    } else {
      return next();
    }
  };

  private initializeRoutes() {
    this.router.get(this.path, this.ensureAuthenticated, this.getAllPosts);
    this.router.get(`${this.path}/:id`, this.ensureAuthenticated, this.getPostById);
    this.router.get(`${this.path}/:id/delete`, this.deletePost);
    this.router.post(`${this.path}/:id/comment`, this.createComment);
    this.router.post(`${this.path}`, this.addPost, this.getAllPosts);
  }

  // 🚀 This method should use your postService and pull from your actual fakeDB, not the temporary posts object
  private getAllPosts = (req: Request, res: Response) => {
    const posts = this._postService.getAllPosts(req.user.username);

    res.render("post/views/posts", { posts });
    // res.render("search/views/search");
  };

  // 🚀 This method should use your postService and pull from your actual fakeDB, not the temporary post object
  private getPostById = async (request: Request, res: Response, next: NextFunction) => {
    res.render("post/views/post", { post });
  };

  // 🚀 These post methods needs to be implemented by you
  private createComment = async (req: Request, res: Response, next: NextFunction) => {};
  private addPost = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const post_obj: IPost = {
      id: uuidv4(),
      message: req.body.postText,
      userId: req.user.id,
      createdAt: new Date(),
      commentList: [],
      likes: 0,
      reposts: 0,
      comments: 0,
    };

    this._postService.addPost(post_obj);

    next();
  };
  private deletePost = async (req: Request, res: Response, next: NextFunction) => {};
}

export default PostController;

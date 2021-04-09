import { Request, Response, NextFunction, Router } from "express";
import IController from "../../../interfaces/controller.interface";
import IPostService from "../services/IPostService";
import { post } from "../../../model/fakeDB";
import IUser from "../../../interfaces/user.interface";
import IPost from '../../../interfaces/post.interface';

class PostController implements IController {
  public path = "/posts";
  public router = Router();
  private _postService: IPostService;

  constructor(postService: IPostService) {
    this.initializeRoutes();
    this._postService = postService;
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllPosts);
    this.router.get(`${this.path}/:id`, this.getPostById);
    this.router.post(`${this.path}/delete`, this.deletePost);
    this.router.post(`${this.path}/:id/comment`, this.createComment);
    this.router.post(`${this.path}`, this.createPost);
  }

  // 🚀 This method should use your postService and pull from your actual fakeDB, not the temporary posts object
  private getAllPosts = (req: Request, res: Response) => {
    console.log("req.sessionID");
    console.log(req.sessionID);

    const user = req.user as IUser;
    const posts = this._postService.getAllPosts(user.username);
    res.render("post/views/posts", { posts, user });
  };

  // 🚀 This method should use your postService and pull from your actual fakeDB, not the temporary post object
  private getPostById = async (request: Request, res: Response, next: NextFunction) => {
    res.render("post/views/post", { post });
  };

  // 🚀 These post methods needs to be implemented by you
  private createComment = async (req: Request, res: Response, next: NextFunction) => {};
  private createPost = async (req: Request, res: Response, next: NextFunction) => {
    const newPost: IPost = this._postService.buildNewPost(req);
    this._postService.addPost(newPost, req.user.id)
    res.redirect("/posts")
  };
  private deletePost = async (req: Request, res: Response, next: NextFunction) => {
    const deletedPostId = req.body.postToDelete
    const userId = req.user.id
    this._postService.deletePost(userId, deletedPostId)
    res.redirect("/posts")
  };
}

export default PostController;

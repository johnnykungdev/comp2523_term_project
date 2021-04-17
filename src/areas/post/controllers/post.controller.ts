import { Request, Response, NextFunction, Router } from "express";
import IController from "../../../interfaces/controller.interface";
import IPostService from "../services/IPostService";
import IUser from "../../../interfaces/user.interface";
import IPost from "../../../interfaces/post.interface";
import { database } from "../../../model/fakeDB";

class PostController implements IController {
  public path = "/posts";
  public router = Router();
  private _postService: IPostService;
  private _db = database.users;
  private liked = [];

  constructor(postService: IPostService) {
    this.initializeRoutes();
    this._postService = postService;
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllPosts);
    this.router.get(`${this.path}/:id`, this.getPostById);
    this.router.post(`${this.path}/delete`, this.deletePost);
    this.router.post(`${this.path}/deleteRepost`, this.deleteRepost);
    this.router.post(`${this.path}/:id/comment`, this.createComment);
    this.router.post(`${this.path}`, this.createPost);
    this.router.post(`${this.path}/:id/like`, this.likePost);
    this.router.post(`${this.path}/repost`, this.repost);
  }

  private repost = async (req: Request, res: Response) => {
    console.log("inside controller repost");
    await this._postService.repost(req);

    res.end();
  };

  // 🚀 This method should use your postService and pull from your actual fakeDB, not the temporary posts object
  private  getAllPosts = async (req: Request, res: Response) => {
    console.log("req.sessionID");
    console.log(req.sessionID);

    const user = req.user as IUser;
    const posts = await this._postService.getAllPosts(user.id);
    console.log("posts", posts)
    res.render("post/views/posts", { posts, user });
  };

  // 🚀 This method should use your postService and pull from your actual fakeDB, not the temporary post object
  private getPostById = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IUser;
    const post = await this._postService.findById(req.params.id);

    res.render("post/views/post", { post, user });
  };

  // 🚀 These post methods needs to be implemented by you

  private createComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postId = req.params.id;
      const user = req.user as IUser;
  
      const newComment = {
        id: new Date().getTime(),
        createdAt: String(new Date()),
        userId: user.id,
        username: user.username,
        message: req.body.commentText,
        postId: Number(postId)
      }
  
      this._postService.addCommentToPost(newComment);
      res.redirect(`${this.path}/${postId}`);
    } catch(error) {
      console.log(error)
    }
  };

  private createPost = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IUser;
    const newPost: IPost = this._postService.buildNewPost(req);
    await this._postService.addPost(newPost, user.id)
    res.redirect("/posts")
  };

  private deletePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deletedPostId = req.body.postToDelete
      console.log("deletePostId", deletedPostId)
      const userId = req.user.id
      const result = await this._postService.deletePost(userId, deletedPostId)
      res.redirect("/posts")
    } catch(error) {
      throw new Error(error)
    }
  };

  private deleteRepost = async (req: Request, res: Response, next: NextFunction) => {
    const deletedPostId = req.body.postToDelete;
    const user = req.user as IUser;
    const userId = user.id;
    await this._postService.deleteRepost(userId, deletedPostId);
    res.redirect("/posts");
  };

  private getUserPost(userId: string, postId: string): object {
    const user = this._db.find((user) => user.id === userId);
    return user.posts.find((post) => post.id === postId);
  }

  private likePost = async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.id;
    const userId = req.body.userId;

    const userPost = this.getUserPost(userId, postId);
    let likeCount = userPost["likes"];
    const idExists = this.liked.find((pId) => pId === postId) === undefined ? false : true;
    if (!idExists) {
      if (likeCount == undefined) {
        likeCount = 0;
      }
      userPost["likes"] = likeCount + 1;
      this.liked.push(postId);
    } else {
      if (likeCount != undefined && likeCount != 0) {
        userPost["likes"] = likeCount - 1;
        const index = this.liked.indexOf(postId);
        this.liked.splice(index, 1);
      }
    }
    res.redirect("/posts");
  };
}

export default PostController;

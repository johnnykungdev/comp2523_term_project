import { Request, Response, NextFunction, Router } from "express";
import IController from "../../../interfaces/controller.interface";
import IPostService from "../services/IPostService";
// import { post } from "../../../model/fakeDB";
import { v4 as uuidv4 } from "uuid";
import IPost from "../../../interfaces/post.interface";
import { PostHelper } from "../../../model/helpers/PostHelper";
import { DbHelper } from "../../../model/helpers/DbHelper";
import { InteractHelper } from "../../../model/helpers/InteractHelper";
import IComment from "../../../interfaces/comment.interface";
import { database } from "../../../model/fakeDB";
import IUser from "../../../interfaces/user.interface";

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
    this.router.get(this.path, this.ensureAuthenticated, this.getUserPosts);
    this.router.get(`${this.path}/all`, this.getAllPosts);
    this.router.get(`${this.path}/:id/delete`, this.deletePost);
    this.router.post(`${this.path}/:id/comment`, this.createComment);
    this.router.post(`${this.path}/:id/comment/reply`, this.commentReply);
    this.router.get(`${this.path}/:username/:id`, this.ensureAuthenticated, this.getPostById);
    this.router.get(`${this.path}/notice/:id/:post_id`, this.ensureAuthenticated, this.getPostByNotification);

    this.router.post(`${this.path}`, this.addPost, this.getUserPosts);
  }

  private getAllPosts = (req: Request, res: Response) => {
    // const posts = PostHelper.getAllPosts(database.users);
    console.log('getAllPostszzzcontroller');
    
    console.log(req.user);
    
    const u_id = req.user._id;
    this._postService.getUserPosts(u_id);
    const user = req.user as IUser;

    res.render("post/views/feeds", { posts, user });
  };

  private deletePost = async (req: Request, res: Response) => {
    console.log("enter");

    const post_id = req.params.id;
    await PostHelper.deletePost(post_id);
    console.log("removed?");

    res.redirect("back");
  };

  // OLD commentReply replaced by the one below
  // private commentReply = async (req: Request, res: Response) => {
  //   const reply_content = {
  //     id: uuidv4(),
  //     message: req.body.replyText,
  //     username: req.user.username,
  //     createdAt: new Date(),
  //   };
  //   const reply_locator = {
  //     poster_username: req.body.poster_username,
  //     post_id: req.params.id,
  //     comment_id: req.body.comment_id,
  //   };

  //   await PostHelper.addReply(reply_locator, reply_content);

  //   res.redirect("back");
  // };

  private commentReply = async (req: Request, res: Response) => {
    const reply_content = {
      id: uuidv4(),
      message: req.body.replyText,
      username: req.user.username,
      createdAt: new Date(),
    };

    const arr = [
      { users: { username: req.body.poster_username } },
      { posts: { id: req.params.id } },
      { commentList: { id: req.body.comment_id } },
    ];

    let returned_reference = await DbHelper.recurseSelect(arr);
    
    // If sucessfully located comment
    if (returned_reference) {
      console.log("inside new commentReply");

      returned_reference.replies.push(reply_content);
      res.redirect("back");
    } else {
      // to do, handle error with actual middlewear...
      throw new Error("No comment found");
    }
  };

  // 🚀 This method should use your postService and pull from your actual fakeDB, not the temporary posts object
  private getUserPosts = async (req: Request, res: Response) => {
    
    const posts = await this._postService.getUserPosts(req.user);
    const user = req.user;

    console.log('is getUserPosts called?');
    console.log(posts);
    console.log('lllllllll');
    // res.render("post/views/posts", { posts, user });
    res.render("post/views/NEW_VIEW/posts", { posts, user });
  };

  // 🚀 This method should use your postService and pull from your actual fakeDB, not the temporary post object
  private getPostById = async (req: Request, res: Response, next: NextFunction) => {
    const post = PostHelper.select(req.params.username, [{ id: req.params.id }])[0];

    const user = req.user;

    res.render("post/views/NEW_VIEW/post", { post, user });
  };

  private getPostByNotification = async (req: Request, res: Response, next: NextFunction) => {
    let username = req.user.username;

    console.log("fidning poast");
    console.log(username);
    console.log(req.params.post_id);

    const post = PostHelper.select(username, [{ id: req.params.post_id }])[0];
    const user = req.user;
    PostHelper.removeNotice(req.params.id);
    res.render("post/views/NEW_VIEW/post", { post, user });
  };

  // 🚀 These post methods needs to be implemented by you
  private createComment = async (req: Request, res: Response, next: NextFunction) => {
    const comment_obj: IComment = {
      id: uuidv4(),
      message: req.body.commentText,
      username: req.user.username,
      createdAt: new Date(),
      replies: [],
    };

    const post_info = {
      poster_username: req.body.poster_username,
      post_id: req.params.id,
    };

    await PostHelper.addComment(post_info, comment_obj);

    const comment_notice = {
      poster_username: req.body.poster_username,
      post_id: req.body.post_id,
      current_user: req.user.username,
    };

    PostHelper.addNotification(comment_notice, "commented");

    res.redirect("back");
  };

  private addPost = async (req: Request, res: Response, next: NextFunction) => {
console.log('addPost addPost addPost');
console.log(req.user);


    const req_data = {
      message: req.body.postText,
      username: req.user.username,
      user_id: req.user.id
    }

   await this._postService.addPost(req_data);
    next();
  };
}

export default PostController;

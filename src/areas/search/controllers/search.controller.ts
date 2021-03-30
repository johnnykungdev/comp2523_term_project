import { Request, Response, NextFunction, Router } from "express";
import IController from "../../../interfaces/controller.interface";
// import IPostService from "../services/IPostService";
import { post } from "../../../model/fakeDB";
import IUser from "../../../interfaces/user.interface";
import { MockSearchService } from "../services/Search.service.mock"

export class SearchController implements IController {
  public path = "/search";
  public router = Router();
  public mockSearchService 
  // private _postService: IPostService;

  // constructor() {
  //   this.initializeRoutes();
  //   this.mockSearchService = new MockSearchService()
  //   // this._postService = postService;
  // }

  constructor(searchService: MockSearchService) {
    this.initializeRoutes();
    this.mockSearchService = searchService;
  }

  private initializeRoutes() {
    this.router.get(`/search`, this.search);
    // this.router.get(this.path, this.getAllPosts);
    // this.router.get(`${this.path}/:id`, this.getPostById);
    // this.router.get(`${this.path}/:id/delete`, this.deletePost);
    // this.router.post(`${this.path}/:id/comment`, this.createComment);
    // this.router.post(`${this.path}`, this.createPost);
  }

  private search = async (req: Request, res: Response, next: NextFunction) => {

      console.log("search page *********************")
      // res.redirect("/search")
    console.log(req.query.query)
    const users = this.mockSearchService.getUsersByName(req.query.query)
    console.log(users)
      res.render("search/views/search", {users})
  };

  // // 🚀 This method should use your postService and pull from your actual fakeDB, not the temporary posts object
  // private getAllPosts = (req: Request, res: Response) => {
  //   console.log("req.sessionID");
  //   console.log(req.sessionID);

  //   const user = req.user as IUser;
  //   const posts = this._postService.getAllPosts(user.username);
  //   res.render("post/views/posts", { posts, user });
  // };

  // // 🚀 This method should use your postService and pull from your actual fakeDB, not the temporary post object
  // private getPostById = async (request: Request, res: Response, next: NextFunction) => {
  //   res.render("post/views/post", { post });
  // };

  // // 🚀 These post methods needs to be implemented by you
  // private createComment = async (req: Request, res: Response, next: NextFunction) => {};
  // private createPost = async (req: Request, res: Response, next: NextFunction) => {};
  // private deletePost = async (req: Request, res: Response, next: NextFunction) => {};
}

// export default SearchController;

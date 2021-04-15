import { Request, Response, NextFunction, Router } from "express";
import { DbHelper } from "../../../model/helpers/dbHelper";
import IController from "../../../interfaces/controller.interface";
import { MockSearchService } from "../services/Search.service.mock"
import IUser from "../../../interfaces/user.interface";

export class SearchController implements IController {
  public path = "/search";
  public router = Router();
  public mockSearchService
  public users: object
  public userPosts: object
  public loggedInUser: object

  constructor(searchService: MockSearchService) {
    this.initializeRoutes();
    this.mockSearchService = searchService;
  }

  private initializeRoutes() {
    this.router.get(`/search`, this.search);
    this.router.get(`/follow`, this.follow);
    this.router.get(`/unfollow`, this.unfollow);
  }

  private search = async (req: Request, res: Response, next: NextFunction) => {
    console.log("search page *********************")
    console.log(req.query)
    const user = req.user as IUser;
    
    const users = this.users = await this.mockSearchService.getUsersByName(req.query.query)
    const userPosts = this.userPosts = await this.mockSearchService.getUserPostsByKeyWord(req.query.query)
    const loggedInUser = this.loggedInUser = await this.mockSearchService.getUserById(user.id)


    res.render("search/views/search", {users, userPosts, loggedInUser})
  };

  private follow = async (req: Request, res: Response, next: NextFunction) => {
    console.log("following")
    console.log(req.query.follow_username)
   
    const users = this.users
    const userPosts = this.userPosts
    const loggedInUser = this.loggedInUser

    loggedInUser['following'].push(req.query.follow_username)
    console.log(loggedInUser)

    res.render("search/views/search", { users, userPosts, loggedInUser })
  };

  private unfollow = async (req: Request, res: Response, next: NextFunction) => {
    console.log("unfollowed")
    console.log(req.query.follow_username)

    const users = this.users
    const userPosts = this.userPosts
    const loggedInUser = this.loggedInUser

    const index = loggedInUser['following'].indexOf(req.query.follow_username);
    loggedInUser['following'].splice(index, 1)
    console.log(loggedInUser)

    res.render("search/views/search", { users, userPosts, loggedInUser })
  };
}



import { Request, Response, NextFunction, Router } from "express";
import IController from "../../../interfaces/controller.interface";
import { MockSearchService } from "../services/Search.service.mock"

export class SearchController implements IController {
  public path = "/search";
  public router = Router();
  public mockSearchService

  constructor(searchService: MockSearchService) {
    this.initializeRoutes();
    this.mockSearchService = searchService;
  }

  private initializeRoutes() {
    this.router.get(`/search`, this.search);
  }

  private search = async (req: Request, res: Response, next: NextFunction) => {
    console.log("search page *********************")
    console.log(req.query.query)
    const users = this.mockSearchService.getUsersByName(req.query.query)
    const userPosts = this.mockSearchService.getUserPostsByKeyWord(req.query.query)
    console.log(users)
    console.log(userPosts)
    res.render("search/views/search", {users, userPosts})
  };
}



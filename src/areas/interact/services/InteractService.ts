import { Request, Response, NextFunction, Router } from "express";


export default interface InteractServiceInterface {
    // addPost(post: IPost, username?: string): void;
    notifications(req: Request, res: Response, next: NextFunction);
  
    like(req: Request, res: Response, next: NextFunction);
  
    search(req: Request, res: Response, next: NextFunction);
  
    follow_action(req: Request, res: Response, next: NextFunction);
  
    repost(req: Request, res: Response, next: NextFunction);
  }
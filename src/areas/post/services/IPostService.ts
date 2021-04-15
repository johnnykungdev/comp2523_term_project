import IPost from "../../../interfaces/post.interface";
import { Request, Response, NextFunction, Router } from "express";

// ⭐️ Feel free to change this interface in any way you like. It is simply an example...
export default interface IPostService {
  // addPost(post: IPost, username?: string): void;
  addPost(req_data: {}, username?: string): void | Promise<void>;

  sortPosts(posts: IPost[]): IPost[];

  getUserPosts(user): Promise<IPost[]> | IPost[];

  findById(id: string): IPost | undefined;

  addCommentToPost(
    message: { id: string; createdAt: string; userId: string; message: string },
    postId: string
  ): IPost | void;
}

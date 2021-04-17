import IPost from "../../../interfaces/post.interface";
import { Request } from "express";


// ⭐️ Feel free to change this interface in any way you like. It is simply an example...
export default interface IPostService {
  addPost(post: IPost, username: string): void;
  deletePost(userId: string | number, postId: string) : Promise<string>;
  sortPosts(posts: IPost[]): IPost[];

  getAllPosts(username: string): Promise<IPost[]>;

  findById(id: string): IPost | undefined;

  addCommentToPost(
    message: { id: string; createdAt: string; userId: string; message: string },
    postId: string,
    // userId: string
  ): IPost | void;

  buildNewPost(req: Request): IPost;
  
  deleteRepost(userId: string, postId: string) : void;

  repost(req: Request);
}

import IPost from "../../../interfaces/post.interface";
import IComment from "../../../interfaces/comment.interface"
import { Request } from "express";


// ⭐️ Feel free to change this interface in any way you like. It is simply an example...
export default interface IPostService {
  addPost(post: IPost, username: string): void;
  deletePost(userId: string | number, postId: string) : Promise<string>;
  sortPosts(posts: IPost[]): IPost[];

  getAllPosts(username: string): Promise<IPost[]>;

  findById(userId: string | number, id: string): IPost | undefined;

  addCommentToPost(
    newComment: IComment
    // userId: string
  ): Promise<IPost> | Promise<void>;

  buildNewPost(req: Request): IPost;
  
  deleteRepost(userId: string, postId: string) : void;

  repost(req: Request);
}

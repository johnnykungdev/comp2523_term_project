import IPost from "../../../interfaces/post.interface";
import IPostService from "./IPostService";
import IUser from "../../../interfaces/user.interface";
import { Request } from "express";

// ❗️ Implement this class much later, once everything works fine with your mock db
export class PostService implements IPostService {
  addPost(post: IPost, username: string): void {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }
  getAllPosts(username: string): IPost[] {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }
  findById(id: string): IPost {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }
  addCommentToPost(message: { id: string; createdAt: string; userId: string; message: string }, postId: string): void {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }

  sortPosts(posts: IPost[]): IPost[] {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }

  deletePost(userId: string, postId: string) {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }

  repost(req: Request) {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }

  deleteRepost(userId: string, postId: string) {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }

  buildNewPost(req: Request) {
    const user = req.user as IUser;
    return {
      id: `${(Math.random() * 100000000).toFixed(0)}`,
      userId: user.id,
      username: user.username,
      message: req.body.postText,
      createdAt: new Date(),
      commentList: [],
      likes: 0,
      reposts: 0,
      comments: 0,
    };
  }
}

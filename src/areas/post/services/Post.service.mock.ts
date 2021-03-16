import { PostHelper } from "../../../model/helpers/PostHelper";
import IPost from "../../../interfaces/post.interface";
import IPostService from "./IPostService";

// ⭐️ Feel free to change this class in any way you like. It is simply an example...
export class MockPostService implements IPostService {
  addPost(post: IPost): void {
    PostHelper.addPost(post);
  }
  getAllPosts(username: string): IPost[] {
    // 🚀 Implement this yourself.
    return PostHelper.getAllPosts(username);
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
}

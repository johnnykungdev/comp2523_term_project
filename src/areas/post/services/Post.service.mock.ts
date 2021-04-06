import { PostHelper } from "../../../model/helpers/PostHelper";
import IPost from "../../../interfaces/post.interface";
import IPostService from "./IPostService";
import { v4 as uuidv4 } from "uuid";


// ⭐️ Feel free to change this class in any way you like. It is simply an example...
export class MockPostService implements IPostService {
  addPost(req_data): void {
    const post_obj: IPost = {...req_data, ...{
      id: uuidv4(),
      createdAt: new Date(),
      commentList: [],
      likes: [],
      reposts: 0,
      comments: 0,
      message: req_data.message,
      username: req_data.username,
      
    } } 
    PostHelper.addPost(post_obj);
  }
  getUserPosts(username: string): IPost[] {
    // 🚀 Implement this yourself.
    return PostHelper.getUserPosts(username);
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

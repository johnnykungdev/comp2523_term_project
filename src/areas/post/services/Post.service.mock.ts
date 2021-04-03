import IPost from "../../../interfaces/post.interface";
import IPostService from "./IPostService";
import { DbHelper } from "../../../model/helpers/dbHelper";

// ⭐️ Feel free to change this class in any way you like. It is simply an example...
export class MockPostService implements IPostService {
  addPost(post: IPost, username: string): void {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }
  getAllPosts(username: string): IPost[] {
    // 🚀 Implement this yourself.

    console.log("getAllPosts " + username);

    const user = DbHelper.select([{ username: username }]);
    const ownposts = user[0].posts;

    ownposts.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB.getTime() - dateA.getTime();
    });

    return ownposts;
  }

  findById(id: string): IPost {
    // 🚀 Implement this yourself.
    console.log(id)
    return DbHelper.findOne({ type: "posts", conditionType: "id", condition: id})
  }
  addCommentToPost(comment: { id: string; createdAt: string; userId: string; message: string }, postId: string): void {
    // 🚀 Implement this yourself.
    DbHelper.insertOne({type: "posts", conditionType: "id", condition: postId}, {type: "commentList", newContent: comment})
  }

  sortPosts(posts: IPost[]): IPost[] {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }
}

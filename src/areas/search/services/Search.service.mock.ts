import IPost from "../../../interfaces/post.interface";
import IUser from "../../../interfaces/user.interface";
import { DbHelper } from "../../../model/helpers/dbHelper";

// ⭐️ Feel free to change this class in any way you like. It is simply an example...
export class MockSearchService {
  public getUsersByName(userName: string): object {
  return DbHelper.getUsersByName(userName)
  }
  // getAllPosts(username: string): IPost[] {
  //   // 🚀 Implement this yourself.

  //   console.log("getAllPosts " + username);

  //   const user = DbHelper.select([{ username: username }]);
  //   const ownposts = user[0].posts;

  //   ownposts.sort((a, b) => {
  //     const dateA = new Date(a.createdAt);
  //     const dateB = new Date(b.createdAt);
  //     return dateB.getTime() - dateA.getTime();
  //   });

  //   return ownposts;
  // }

  // findById(id: string): IPost {
  //   // 🚀 Implement this yourself.
  //   throw new Error("Method not implemented.");
  // }
  // addCommentToPost(message: { id: string; createdAt: string; userId: string; message: string }, postId: string): void {
  //   // 🚀 Implement this yourself.
  //   throw new Error("Method not implemented.");
  // }

  // sortPosts(posts: IPost[]): IPost[] {
  //   // 🚀 Implement this yourself.
  //   throw new Error("Method not implemented.");
  // }
}

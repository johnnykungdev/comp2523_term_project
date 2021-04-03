import IPost from "../../../interfaces/post.interface";
import IPostService from "./IPostService";
import { DbHelper } from "../../../model/helpers/dbHelper";

// ⭐️ Feel free to change this class in any way you like. It is simply an example...
export class MockPostService implements IPostService {
  addPost(post: IPost, userId: string): void {
    //db helper, can switch to real db services later
    DbHelper.insertPost(userId, post)

    // throw new Error("Method not implemented.");
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

  buildNewPost(req: Request) {
    return {
      id: `${(Math.random() * 100000000).toFixed(0)}`,
      userId: req.user.id,
      username: req.user.username,
      message: req.body.postText,
      createdAt: new Date(),
      commentList: [],
      likes: 0,
      reposts: 0,
      comments: 0
    }
  }

  deletePost(userId: string, postId: string) {
    DbHelper.deletePost(userId, postId)
  }
}

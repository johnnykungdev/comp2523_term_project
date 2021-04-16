import IPost from "../../../interfaces/post.interface";
import IPostService from "./IPostService";
import admin from '../../../model/firebase'

// ❗️ Implement this class much later, once everything works fine with your mock db
export class PostService implements IPostService {
  private _database: any
  constructor() {
    this._database = admin.database()
  }

  async addPost(post: IPost, username: string): Promise<void> {
    // 🚀 Implement this yourself.
    const ref = this._database.ref("users/posts")
    await ref.push(post)
    console.log('123')
  }

  deletePost(postId: string) {
    
  }
  async getAllPosts(userId: string): Promise<IPost[]> {
    const ref = this._database.ref("users")
    const result = await ref.on("value").val()
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
}

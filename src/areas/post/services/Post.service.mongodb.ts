import { PostHelper } from "../../../model/helpers/PostHelper";
import IPost from "../../../interfaces/post.interface";
import IPostService from "./IPostService";
import { v4 as uuidv4 } from "uuid";
import client from "../../../../Mongodb/databaseConnection";
import * as mongo from "mongodb";
const ObjectId = mongo.ObjectId;

// ⭐️ Feel free to change this class in any way you like. It is simply an example...
export class MockPostServiceMongodb implements IPostService {
  async addPost(req_data): Promise<void> {
    const post_obj: IPost = {...req_data, ...{
      id: uuidv4(),
      createdAt: new Date(),
      commentList: [],
      likes: [],
      reposts: 0,
      comments: 0,
      message: req_data.message,
    } } 
    
    await client.connect();
    const userCollection = await client.db("oop_term_project").collection("users")

    try {
      const where = {username: req_data.username}
      const values = {$push: {posts : post_obj}}
      // let { ops: inserted } = await userCollection.updateOne(where, values)
      let ops = await userCollection.updateOne(where, values)
    } catch (error) {
      console.log('err at add post');
      console.log(error);
    }
    return;
  }
  async getUserPosts(req_user): Promise<IPost[]> {
    await client.connect();
    const userCollection = await client.db("oop_term_project").collection("users");
		const posts = await userCollection.find({"_id" : ObjectId(req_user._id)}).project({posts: 1}).toArray();

    console.log('stoppererrrgup');
    console.log(posts[0].posts);
    await client.close();
    return posts[0].posts;
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

import IPost from "../../../interfaces/post.interface";
import IPostService from "./IPostService";
import { Sequelize, DataTypes } from "sequelize";
import databaseConnectionString from "../../../../config/databaseConnectionSequelize";
import postModelFunc from "../../../../models/post";
const sequelize = new Sequelize(databaseConnectionString);
const postModel = postModelFunc(sequelize, DataTypes);


import likeModelFunc from "../../../../models/like";
const likeModel = likeModelFunc(sequelize, DataTypes);


import { v4 as uuidv4 } from "uuid";

// ❗️ Implement this class much later, once everything works fine with your mock db
export class PostService implements IPostService {
  async addPost(req_data: {}, username: string): Promise<void> {

    const post_obj = {
      createdAt: new Date(),
      message: req_data.message,
      reposts: 0,
      user_id: req_data.user_id,
    } 

    console.log('inside addPost');
    console.log(post_obj);
    
    let newPost = postModel.build(post_obj);
    await newPost.save();
  }
  async getUserPosts(u_id: string): Promise<IPost[]> {
    console.log('getUserPosts service');
    const posts = await postModel.findAll({
      raw: true,
      where: {
        user_id: u_id,
      },
    });

    for (let i = 0; i < posts.length; i++) {
      const likes = await likeModel.findAll({
        raw: true,
        where: {
          post_id: posts[i].id,
        },
      });
      posts[i]["likes"] = likes;
    }
    
    return posts;
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

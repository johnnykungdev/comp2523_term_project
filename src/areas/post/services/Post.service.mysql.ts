import IPost from "../../../interfaces/post.interface";
import IPostService from "./IPostService";
import { Sequelize, DataTypes } from "sequelize";
import databaseConnectionString from "../../../../config/databaseConnectionSequelize";
import postModelFunc from "../../../../models/post";
const sequelize = new Sequelize(databaseConnectionString);
const postModel = postModelFunc(sequelize, DataTypes);


import likeModelFunc from "../../../../models/like";
const likeModel = likeModelFunc(sequelize, DataTypes);
import cmtModelFunc from "../../../../models/comment";
const cmtModel = cmtModelFunc(sequelize, DataTypes);


import { v4 as uuidv4 } from "uuid";

// ❗️ Implement this class much later, once everything works fine with your mock db
export class PostServiceMysql implements IPostService {
  async addPost(req_data, username: string): Promise<void> {

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
  async getUserPosts(req_user) {
    const posts = await postModel.findAll({
      raw: true,
      where: {
        user_id: req_user.id,
      },
    }) as IPost[];

    for (let i = 0; i < posts.length; i++) {
      const likes = await likeModel.findAll({
        raw: true,
        where: {
          post_id: posts[i].id,
        },
      });

      const commentList = await cmtModel.findAll({
        raw: true,
        where: {
          post_id: posts[i].id,
        },
      });

      posts[i]["likes"] = likes;
      posts[i]["commentList"] = commentList;

    }
    
    return posts.reverse();
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

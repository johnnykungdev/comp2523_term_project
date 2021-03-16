import IPost from "../../interfaces/post.interface";
import { database } from "../fakeDB";
import { UserHelper } from "./UserHelper";
import { v4 as uuidv4 } from "uuid";

export class PostHelper {
  private static _user;

  private static sortPosts(post_array) {}

  private static getOwnPosts() {
    console.log("all posts by user");

    console.log(this._user[0].posts);

    return this._user[0].posts;
  }

  static getAllPosts(username): IPost[] {
    this._user = UserHelper.select([{ username: username }]);
    const ownposts = this.getOwnPosts();
    return ownposts;
  }

  static addPost(post: IPost) {
    for (let i = 0; i < database.users.length; i++) {
      if (database.users[i].id == post.userId) {
        console.log("match");
        console.log(database.users[i].id + " " + post.userId);

        database.users[i].posts.push(post);
      }
    }
  }
}

import IPost from "../../interfaces/post.interface";
import { database } from "../fakeDB";
import { UserHelper } from "./UserHelper";

export class PostHelper {
  private static _user;

  private static sortPosts(post_array) {}

  private static getOwnPosts() {
    return this._user[0].posts;
  }

  static getAllPosts(username): IPost[] {
    this._user = UserHelper.select([{ username: username }]);
    const ownposts = this.getOwnPosts();
    return ownposts;
  }
}

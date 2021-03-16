import IPost from "../../interfaces/post.interface";
import { database } from "../fakeDB";
import { UserHelper } from "./UserHelper";

export class PostHelper {
  private static _user;

  private static sortPosts(post_array) {}

  private static getOwnPosts(user) {
    console.log(user.posts);
    return user.posts;
  }

  private static getAllPosts(): IPost[] {
    let allPosts: IPost[] = [];
    for (let user of database.users) {
      allPosts.push(...this.getOwnPosts(user));
    }
    return allPosts;
  }

  static getUserPosts(username): IPost[] {
    this._user = UserHelper.select([{ username: username }]);
    const ownposts = this.getOwnPosts(this._user[0]);
    ownposts.sort((a, b) => {
      var dateA = new Date(a.createdAt);
      var dateB = new Date(b.createdAt);
      return dateB - dateA;
    });

    return ownposts;
  }

  static addPost(post: IPost) {
    for (let i = 0; i < database.users.length; i++) {
      if (database.users[i].username == post.username) {
        database.users[i].posts.push(post);
      }
    }
  }

  private static _search_reducer(state, condition) {
    state = state.filter((post) => {
      if (post[Object.keys(condition)[0]].includes(Object.values(condition)[0])) {
        return true;
      }
      return false;
    });

    return state;
  }

  static search(conditions: {}[]) {
    const allPosts = this.getAllPosts();
    return conditions.reduce(this._search_reducer, allPosts);
  }
}

import IUser from "../../interfaces/user.interface";
import IPost from "../../interfaces/post.interface";
import { database } from "../fakeDB";
import { UserHelper } from "./UserHelper";

export class PostHelper {

  private static getFollowedPosts(username) {
    
    const followed_users_names: string[] = UserHelper.select([{ username: username }])[0].following;
    let followed_users: IUser[] = [];

    if(followed_users_names.length != 0) {
      for(let name of followed_users_names) {
        followed_users.push(UserHelper.select([{username: name}]));
      }
  
      console.log('when getFollowedPostssss');
      console.log(followed_users[0]);
      return this.getAllPosts(followed_users[0]);
    }

    return [];

    
  }

  private static getOwnPosts(user) {
    return user.posts;
  }

  private static getAllPosts(user_group): IPost[] {

    console.log('not iterable?');
    
    console.log(user_group);
    
    let allPosts: IPost[] = [];
    for (let user of user_group) {

      console.log('bill where are you?');
      console.log(user);
      
      
      allPosts.push(...user.posts);
    }
    return allPosts;
  }

  static getUserPosts(username): IPost[] {

    let merged_posts = [];
    const user = UserHelper.select([{ username: username }]);
    const ownposts = user[0].posts;
    const followed_posts = this.getFollowedPosts(username);

    console.log('where are my followed_posts????');
    console.log(followed_posts);
    
    
    merged_posts.push(...ownposts, ...followed_posts);


    merged_posts.sort((a, b) => {
      var dateA = new Date(a.createdAt);
      var dateB = new Date(b.createdAt);
      return dateB - dateA;
    });

    return merged_posts;
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
    
    const allPosts = this.getAllPosts(database.users);
    return conditions.reduce(this._search_reducer, allPosts);
  }
}

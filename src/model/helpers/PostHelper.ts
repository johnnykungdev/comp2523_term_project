import IUser from "../../interfaces/user.interface";
import IPost from "../../interfaces/post.interface";
import { database } from "../fakeDB";
import { UserHelper } from "./UserHelper";
import IComment from "../../interfaces/comment.interface";
import INotification from "../../interfaces/notification.interface";

import { v4 as uuidv4 } from "uuid";

export class PostHelper {
  private static findWithAttr(array, attr, value) {
    for (var i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) {
        return i;
      }
    }
    return -1;
  }

  static addNotification(info_obj, type: string) {
    const n_obj = {
      id: uuidv4(),
      createdAt: new Date(),
      type: type,
      post_id: info_obj.post_id,
      originator: info_obj.current_user,
    };

    for (let i = 0; i < database.users.length; i++) {
      if (database.users[i].username == info_obj.poster_username) {
        database.users[i].notifications.push(n_obj);
      }
    }
  }

  static deletePost(post_id) {
    for (let i = 0; i < database.users.length; i++) {
      for (let j = 0; j < database.users[i].posts.length; j++) {
        if (database.users[i].posts[j].id == post_id) {
          // const index = database.users[i].posts.indexOf(post_id);
          const index = this.findWithAttr(database.users[i].posts, "id", post_id);
          database.users[i].posts.splice(index, 1);

          // const inddex = database.users[i].posts[j].likes.indexOf(like_obj.current_user);
          // database.users[i].posts[j].likes.splice(inddex, 1);
        }
      }
    }
  }

  static removeNotice(notice_id) {
    for (let j = 0; j < database.users.length; j++) {
      for (let i = 0; i < database.users[j].notifications.length; i++) {
        // console.log("database.users[j].notifications[i]");

        // console.log(database.users[j].notifications[i].id);

        // console.log(notice_id);

        const notice = database.users[j].notifications[i] as INotification;

        if (notice.id == notice_id) {
          database.users[j].notifications.splice(i, 1);
          console.log(database.users[j].notifications);
        }
      }
    }
  }

  private static getFollowedPosts(username) {
    const followed_users_names: string[] = UserHelper.select([{ username: username }])[0].following;
    let followed_users: IUser[] = [];

    if (followed_users_names.length != 0) {
      for (let name of followed_users_names) {
        followed_users.push(UserHelper.select([{ username: name }]));
      }

      console.log("when getFollowedPostssss");
      console.log(followed_users[0]);
      return this.getAllPosts(followed_users[0]);
    }

    return [];
  }

  static getAllPosts(user_group): IPost[] {
    let allPosts: IPost[] = [];
    for (let user of user_group) {
      allPosts.push(...user.posts);
    }

    console.log("all posts");
    console.log(allPosts);

    return allPosts;
  }

  private static getRepostedPosts(username) {
    const reposts = UserHelper.select([{ username: username }])[0].reposts;
    const post_array: IPost[] = [];
    //buidling the posts object here
    for (let r of reposts) {
      for (let u of database.users) {
        // match user
        if (r.poster_username == u.username) {
          // match post
          for (let p of u.posts) {
            if (r.post_id == p.id) {
              let p_copy = { ...p, createdAt: r.repostedAt, originalDate: p.createdAt };
              post_array.push(p_copy);
            }
          }
        }
      }
    }
    return post_array;
  }

  static getUserPosts(username): IPost[] {
    let merged_posts = [];
    const user = UserHelper.select([{ username: username }]);
    const ownposts = user[0].posts;
    const followed_posts = this.getFollowedPosts(username);
    const reposted_posts = this.getRepostedPosts(username);

    console.log("where are my followed_posts????");
    console.log(followed_posts);

    merged_posts.push(...ownposts, ...followed_posts, ...reposted_posts);

    merged_posts.sort((a, b) => {
      var dateA = new Date(a.createdAt);
      var dateB = new Date(b.createdAt);
      return dateB.getTime() - dateA.getTime();
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

  private static _select_reducer(state, condition) {
    state = state.filter((user) => {
      if (user[Object.keys(condition)[0]] == Object.values(condition)[0]) {
        return true;
      }
      return false;
    });

    return state;
  }

  static select(username, conditions: {}[]) {
    for (let u of database.users) {
      if (username == u.username) {
        return conditions.reduce(this._select_reducer, u.posts);
      }
    }

    throw new Error("user or post not found");
  }

  static addComment(post_info, comment: IComment) {
    for (let i = 0; i < database.users.length; i++) {
      if (database.users[i].username == post_info.poster_username) {
        for (let j = 0; j < database.users[i].posts.length; j++) {
          if (database.users[i].posts[j].id == post_info.post_id) {
            database.users[i].posts[j].commentList.push(comment);
            console.log("database.users[i].posts[j].commentList");
            console.log(database.users[i].posts[j].commentList);

            return;
          }
        }
      }
    }
    throw new Error("post or user not found. Comment cannot be added.");
  }

  // Is there anything can be done with these nested loops?
  static addReply(reply_locator, reply_content: IComment) {
    for (let i = 0; i < database.users.length; i++) {
      if (database.users[i].username == reply_locator.poster_username) {
        for (let j = 0; j < database.users[i].posts.length; j++) {
          if (database.users[i].posts[j].id == reply_locator.post_id) {
            console.log(database.users[i].posts[j].id + " 2 " + reply_locator.post_id);
            for (let k = 0; k < database.users[i].posts[j].commentList.length; k++) {
              if (database.users[i].posts[j].commentList[k].id == reply_locator.comment_id) {
                database.users[i].posts[j].commentList[k].replies.push(reply_content);
                return;
              }
            }
          }
        }
      }
    }
    throw new Error("post or user or comment not found. reply cannot be added.");
  }

  static like(like_obj) {
    for (let i = 0; i < database.users.length; i++) {
      if (like_obj.poster_username == database.users[i].username) {
        for (let j = 0; j < database.users[i].posts.length; j++) {
          if (database.users[i].posts[j].id == like_obj.post_id) {
            if (database.users[i].posts[j].likes.includes(like_obj.current_user)) {
              const index = database.users[i].posts[j].likes.indexOf(like_obj.current_user);
              database.users[i].posts[j].likes.splice(index, 1);
            } else {
              database.users[i].posts[j].likes.push(like_obj.current_user);
            }
            return;
          }
        }
      }
    }
    throw new Error("Something happened, post not liked");
  }
}

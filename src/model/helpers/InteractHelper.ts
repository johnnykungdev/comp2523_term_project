import IPost from "../../interfaces/post.interface";
import { database } from "../fakeDB";
import { UserHelper } from "./UserHelper";

export class InteractHelper {
  static follow(current_user, followed_user) {
    for (let user of database.users) {
      if (current_user == user.username) {
        user.following.push(followed_user);
        return;
      }
    }
    // need correct error handling here.
    throw new Error("user not found");
  }

  static unfollow(current_user, unfollowed_user) {
    for (let user of database.users) {
      if (current_user == user.username) {
        const index = user.following.indexOf(unfollowed_user);
        user.following.splice(index, 1);
        return;
      }
    }
    // need correct error handling here.
    throw new Error("user not found");
  }

  static repost(current_user, poster_username, post_id) {
    const repost_obj = {
      poster_username: poster_username,
      post_id: post_id,
      repostedAt: new Date(),
    };

    for (let user of database.users) {
      if (current_user.username == user.username) {
        user.reposts.push(repost_obj);

        console.log("repost in db");
        console.log(user.reposts);

        // [
        //   {
        //     poster_username: 'james123',
        //     post_id: 'abc3',
        //     repostedAt: 2021-03-17T00:05:51.253Z
        //   },
        //   {
        //     poster_username: 'james123',
        //     post_id: 'abc5',
        //     repostedAt: 2021-03-17T00:05:55.896Z
        //   }
        // ]
        return;
      }
    }
    // need correct error handling here.
    throw new Error("user not found");
  }
}

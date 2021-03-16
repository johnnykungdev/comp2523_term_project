import IPost from "../../interfaces/post.interface";
import { database } from "../fakeDB";
import { UserHelper } from "./UserHelper";

export class InteractHelper {

    static follow(current_user, followed_user) {
        for(let user of database.users) {
            if (current_user == user.username) {
                user.following.push(followed_user);
                return;
            }
        }
        // need correct error handling here.
        throw new Error("user not found");
    }

    static unfollow(current_user, unfollowed_user) {
        for(let user of database.users) {
            if (current_user == user.username) {
                const index = user.following.indexOf(unfollowed_user);
                user.following.splice(index,1);
                return;
            }
        }
        // need correct error handling here.
        throw new Error("user not found");
    }

}

import IUser from "../../interfaces/user.interface";
import IPost from "../../interfaces/post.interface";
import IComment from "../../interfaces/comment.interface";
import { database } from "../fakeDB";



export class DbHelper {
  static recurseSelect(objs_arr: { [key: string]: { [key: string]: string } }[]) {
    function recurse_loop(loopable, current) {
      for (let i = 0; i < loopable[Object.keys(current)[0]].length; i++) {
        if (
          loopable[Object.keys(current)[0]][i][Object.keys(Object.values(current)[0])[0]] ==
          Object.values(Object.values(current)[0])[0]
        ) {
          return loopable[Object.keys(current)[0]][i];
        }
      }
      return null;
    }

    return objs_arr.reduce(recurse_loop, database);
  }
}


// const arr = [{ users: { username: "james123" } }, { posts: { id: "abc3" } }, { commentList: { id: "abc4" } }];

// recurseSelect(arr).replies.push({
//   id: "iamtheinevitable",
//   message: "hellow",
//   createdAt: new Date(),
//   username: "james111",
// });

import { database } from "../fakeDB";

export class DbHelper {
  static readonly _db = database.users;

  static select(conditions: { [key: string]: string }[], db_level = this._db) {
    return conditions.reduce((state, condition) => {
      state = state.filter((user) => {
        if (user[Object.keys(condition)[0]] == Object.values(condition)[0]) {
          return true;
        }
        return false;
      });

      return state;
    }, db_level);
  }

  static search(conditions: { [key: string]: string }[], db_level = this._db) {
    return conditions.reduce((state, condition) => {
      state = state.filter((user) => {
        if (user[Object.keys(condition)[0]].includes(Object.values(condition)[0])) {
          return true;
        }
        return false;
      });

      return state;
    }, db_level);
  }

  // Example of array to pass to recurseSelect
  // arr = [{ users: { username: "james123" } }, { posts: { id: "abc3" } }, { commentList: { id: "abc4" } }];

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


  static insertPost(userId, newPost) {
    const matchedUser = database.users.find(user => user.id === userId)
    if (matchedUser) {
        matchedUser.posts.push(newPost)
    } else {
      throw new Error("User not found.")
    }
    console.log(matchedUser.posts)
  }

  //delete 
  static deletePost(userId, postId) { 
    const matchedUser = database.users.find(user => user.id === userId)
    if (matchedUser) {
      const deletedPostIndex = matchedUser.posts.findIndex(post => post.id === postId)
      matchedUser.posts.splice(deletedPostIndex, 1)
    } else {
      throw new Error("User not found.")
    }


  static getFullName(user: object): string {
    return (user["firstName"] + " " + user["lastName"]).toLowerCase()
  }

  static getUsersByName (userName: string): object {
    return this._db.filter(user => DbHelper.getFullName(user).includes(userName.toLowerCase()))
  }

  static getUserPostsByKeyWord(keyWord: string): object {
    const userPosts = []
    for (const dbUser of this._db) {
      const user = {}
      user["name"] = dbUser["firstName"] + " " + dbUser["lastName"]
      const messageList = []
      for (const post of dbUser.posts) {
        if ((post.message).toLowerCase().includes(keyWord.toLowerCase())) {
          messageList.push(post.message)
        }
      }
      if (messageList.length > 0) {
        user["posts"] = messageList
        userPosts.push(user)
      }
    }
    return userPosts

  }
}

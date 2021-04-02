import { database } from "../fakeDB";

export class DbHelper {
  static readonly _db = database.users;

  static select(conditions: { [key: string]: string }[]) {
    return conditions.reduce((state, condition) => {
      state = state.filter((user) => {
        if (user[Object.keys(condition)[0]] == Object.values(condition)[0]) {
          return true;
        }
        return false;
      });

      return state;
    }, this._db);
  }

  static search(conditions: { [key: string]: string }[]) {
    return conditions.reduce((state, condition) => {
      state = state.filter((user) => {
        if (user[Object.keys(condition)[0]].includes(Object.values(condition)[0])) {
          return true;
        }
        return false;
      });

      return state;
    }, this._db);
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

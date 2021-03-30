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

  static getUsersByName(userName: string): object {
    return this._db.filter(user => user["firstName"] === userName)
  }

  static getPostsByKeyWord(userName: string): object {
    return this._db.filter(user => user["firstName"] === userName)
  }
}

import { database } from "../model/fakeDB";
import { v4 as uuidv4 } from "uuid";

export class DbHelper {
  private static _reducer(state, condition) {
    state = state.filter((user) => {
      if (user[Object.keys(condition)[0]] == Object.values(condition)[0]) {
        return true;
      }
      return false;
    });

    return state;
  }

  static select(conditions: {}[]) {
    return conditions.reduce(this._reducer, database.users);
  }

  static createUser(form_obj) {
    database.users.push({
      id: uuidv4(),
      email: form_obj.email,
      password: form_obj.password,
      firstName: form_obj.firstName,
      lastName: form_obj.lastName,
      username: form_obj.username,
      posts: [],
    });

    return this.select([{ username: form_obj.username }]);
  }
}

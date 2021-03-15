import { database } from "../model/fakeDB";

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
}

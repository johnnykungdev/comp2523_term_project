import { database } from "../../../model/fakeDB";
import IUser from "../../../interfaces/user.interface";
import { IAuthenticationService } from "./IAuthentication.service";
import { resolve } from "path";
import { DbHelper } from "../../../helpers/DbHelper";

export class MockAuthenticationService implements IAuthenticationService {
  readonly _db = database;

  public async getUserByEmailAndPassword(email: string, password: string): Promise<IUser> {
    let user = DbHelper.select([{ email: email }, { password: password }])[0];

    return user;
  }

  public async findUserByEmail(email: String): Promise<null | IUser> {
    let user = DbHelper.select([{ email: email }])[0];

    return user;
  }

  public async createUser(form_obj): Promise<IUser> {
    console.log("inside service createUser");

    if (DbHelper.select([{ username: form_obj.username }])[0] || DbHelper.select([{ email: form_obj.email }])[0]) {
      throw new Error("User already exist");
    } else {
      console.log("about to call  DB helper");

      return DbHelper.createUser(form_obj);
    }
  }
}

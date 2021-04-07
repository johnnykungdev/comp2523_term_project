import { database } from "../../../model/fakeDB";
import IUser from "../../../interfaces/user.interface";
import { IAuthenticationService } from "./IAuthentication.service";
import { resolve } from "path";
import { UserHelper } from "../../../model/helpers/UserHelper";

export class MockAuthenticationService implements IAuthenticationService {
  readonly _db = database;

  public async getUserByEmailAndPassword(email: string, password: string): Promise<IUser> {
    let user = await UserHelper.select([{ email: email }, { password: password }])[0];

    return user;
  }

  public async findUserByEmail(email: String): Promise<null | IUser> {
    let user = await UserHelper.select([{ email: email }])[0];

    return user;
  }

  public async createUser(form_obj): Promise<null | IUser> {
    if (
      !UserHelper.select([{ username: form_obj.username }])[0] &&
      !UserHelper.select([{ email: form_obj.email }])[0]
    ) {
      return UserHelper.createUser(form_obj)[0];
    }

    return null;
  }
}

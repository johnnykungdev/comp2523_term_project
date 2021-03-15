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

  public async createUser(user: any): Promise<IUser> {
    throw new Error("Method not implemented");
  }
}

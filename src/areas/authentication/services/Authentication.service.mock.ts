import { database } from "../../../model/fakeDB";
import IUser from "../../../interfaces/user.interface";
import { IAuthenticationService } from "./IAuthentication.service";
import { DbHelper } from "../../../model/helpers/dbHelper";

export class MockAuthenticationService implements IAuthenticationService {
  readonly _db = database;

  public async getUserByEmailAndPassword(email: string, password: string): Promise<IUser> {
    let user = await DbHelper.select([{ email: email }, { password: password }])[0];
    return user;
  }

  public async findUserByEmail(email: string): Promise<null | IUser> {
    let user = await DbHelper.select([{ email: email }])[0];
    return user;
  }

  public async createUser(user: any): Promise<IUser> {
    throw new Error("Method not implemented");
  }
}

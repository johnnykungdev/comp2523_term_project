import { database } from "../../../model/fakeDB";
import IUser from "../../../interfaces/user.interface";
import { IAuthenticationService } from "./IAuthentication.service";
import { DbHelper } from "../../../model/helpers/dbHelper";
import { v4 as uuidv4 } from "uuid";

export class MockAuthenticationService implements IAuthenticationService {
  readonly _db = database;

  public async getUserByEmailAndPassword(email: string, password: string): Promise<IUser> {
    let user: IUser = await DbHelper.select([{ email: email }, { password: password }])[0];
    return user;
  }

  public async findUserByEmail(email: string): Promise<null | IUser> {
    let user: IUser = await DbHelper.select([{ email: email }])[0];
    return user;
  }

  public async createUser(form_body): Promise<null | IUser> {
    let user: IUser;

    if (!DbHelper.select([{ username: form_body.username }])[0] && !DbHelper.select([{ email: form_body.email }])[0]) {
      database.users.push({
        id: uuidv4(),
        email: form_body.email,
        password: form_body.password,
        firstName: form_body.firstName,
        lastName: form_body.lastName,
        username: form_body.username,
        posts: [],
      });

      user = DbHelper.select([{ username: form_body.username }])[0];
    }
    return user ? user : null;
  }
}

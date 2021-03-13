import { database } from "../../../model/fakeDB";
import IUser from "../../../interfaces/user.interface";
import { IAuthenticationService } from "./IAuthentication.service";
import { resolve } from "path";

export class MockAuthenticationService implements IAuthenticationService {
  readonly _db = database;

  public async getUserByEmailAndPassword(email: string, password: string): Promise<IUser> {

    let data = {
      id: '1',
      username: 'billgates',
      email: 'gates@gmail.com',
      password: 'gates123',
      firstName: 'Bill',
      lastName: 'Gates',
    }

    return data;

  }

  public async findUserByEmail(email: String): Promise<null | IUser> {

    let data = {
      id: '1',
      username: 'billgates',
      email: 'gates@gmail.com',
      password: 'gates123',
      firstName: 'Bill',
      lastName: 'Gates',
    }

    return data;
    // throw new Error("Method not implemented");
  }

  public async createUser(user: any): Promise<IUser> {
    throw new Error("Method not implemented");
  }
}

import IUser from "../../../interfaces/user.interface";
import { IAuthenticationService } from "./IAuthentication.service";
import {User} from "../../../../models/user";

// ❗️ Implement this class much later, once everything works fine with your mock db
export class AuthenticationService implements IAuthenticationService {
  // ⭐️ _db should be a reference to your real database driver
  readonly _db: any;
  usr = new User();
  async findUserByEmail(email: String): Promise<IUser> {
    const user = await this.usr.findAll({
      where: {
        email: 12
      }
    });
    throw new Error("Method not implemented.");
  }
  async getUserByEmailAndPassword(email: string, password: string): Promise<IUser> {
    const user = await this.usr.findAll({
      where: {
        email: 12,
        password: 'active'
      }
    });

    // 🚀 Talk to your real database here
    throw new Error("Method not implemented.");
  }
  async createUser(user: IUser): Promise<IUser> {
    // 🚀 Talk to your real database here
    throw new Error("Method not implemented.");
  }
}

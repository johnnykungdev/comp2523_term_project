import IUser from "../../../interfaces/user.interface";
import { IAuthenticationService } from "./IAuthentication.service";
import { Sequelize, DataTypes } from "sequelize";
import databaseConnectionString from "../../../../config/databaseConnectionSequelize";
import userModelFunc from "../../../../models/user";
const sequelize = new Sequelize(databaseConnectionString);
const userModel = userModelFunc(sequelize, DataTypes);


// ❗️ Implement this class much later, once everything works fine with your mock db
export class AuthenticationService implements IAuthenticationService {
  // ⭐️ _db should be a reference to your real database driver
  readonly _db: any;

  async findUserByEmail(email: String): Promise<IUser> {
    console.log("findUserByEmail findUserByEmail");
    
    const user = await userModel.findAll({
      raw: true,
      where: {
        email: email,
      },
    });
    
    console.log(user);
    return user[0];
  }
  async getUserByEmailAndPassword(email: string, password: string): Promise<IUser> {
    // console.log("getUserByEmailAndPassword getUserByEmailAndPassword");

    const user = await userModel.findAll({
      where: {
        email: email,
        password: password,
      },
    });
    // console.log(user);

    return user[0];
  }
  async createUser(user: IUser): Promise<IUser> {
    // 🚀 Talk to your real database here
    throw new Error("Method not implemented.");
  }
}

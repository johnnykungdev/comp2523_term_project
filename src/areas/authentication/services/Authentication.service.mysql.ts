import IUser from "../../../interfaces/user.interface";
import { IAuthenticationService } from "./IAuthentication.service";
import { Sequelize, DataTypes } from "sequelize";
import databaseConnectionString from "../../../../config/databaseConnectionSequelize";
import userModelFunc from "../../../../models/user";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
 
const passwordPepper = "SeCretPeppa4MySal+";
const sequelize = new Sequelize(databaseConnectionString, {query:{raw:true}});
const userModel = userModelFunc(sequelize, DataTypes);


// ❗️ Implement this class much later, once everything works fine with your mock db
export class AuthenticationServiceMysql implements IAuthenticationService {
  // ⭐️ _db should be a reference to your real database driver
  readonly _db: any;

  async findUserByEmail(email: string) {
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
  async getUserByEmailAndPassword(email: string, password: string) {
    console.log("getUserByEmailAndPassword getUserByEmailAndPassword");
    console.log(password);
    

    const password_salt = crypto.createHash("sha512");
    password_salt.update(uuidv4());
    const password_hash = crypto.createHash("sha512");
    password_hash.update(password + passwordPepper + password_salt);

    console.log('password_hash');
    console.log(password_hash);

    // Hash {
    //   _options: undefined,
    //   [Symbol(kHandle)]: Hash {},
    //   [Symbol(kState)]: { [Symbol(kFinalized)]: false }
    // }
    
    const user = await userModel.findAll({
      where: {
        email: email,
        password_hash: password_hash.digest("hex"),
      },
    });
    // console.log(user);

    return user[0];
  }
  async createUser(form_obj): Promise<null | IUser>  {

    console.log('createUser');
    console.log(form_obj);
    
    // {
    //   username: 'elonmusk',
    //   firstName: 'elon',
    //   lastName: 'musk',
    //   email: 'elon@musk.com',
    //   password: 'elonmusk'
    // }

    const password_salt = crypto.createHash("sha512");
    password_salt.update(uuidv4());
    const password_hash = crypto.createHash("sha512");
    password_hash.update(form_obj.password + passwordPepper + password_salt);

    console.log('createUsers password_hassssh')
    // Hash {
    //   _options: undefined,
    //   [Symbol(kHandle)]: Hash {},
    //   [Symbol(kState)]: { [Symbol(kFinalized)]: false }
    // }
    
    console.log(password_hash);
    

    let newUser = userModel.build({
      email: form_obj.email,
      firstName: form_obj.firstName,
      lastName: form_obj.lastName,
      username: form_obj.username,
      password_salt: password_salt.digest("hex"),
      password_hash: password_hash.digest("hex"),
    },{raw:true});

    
    await newUser.save();

    return newUser.dataValues;
  }
}

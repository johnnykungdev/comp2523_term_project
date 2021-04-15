import IUser from "../../../interfaces/user.interface";
import { IAuthenticationService } from "./IAuthentication.service";
import Joi from "joi";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import client from "../../../../Mongodb/databaseConnection";
// import { response } from "express";
const passwordPepper = "SeCretPeppa4MySal+";

// ❗️ Implement this class much later, once everything works fine with your mock db
export class AuthenticationServiceMongoDb implements IAuthenticationService {
  // ⭐️ _db should be a reference to your real database driver
  readonly _db: any;

  async findUserByEmail(email: String): Promise<IUser> {

    await client.connect();
    const userCollection = await client.db("oop_term_project").collection("users");
    try {
      const results = await userCollection.findOne({ email: email });
      return results;
    } catch (error) {
      return error;
    } finally {
      await client.close();
    }
  }
  async getUserByEmailAndPassword(email: string, password: string): Promise<IUser> {


    const password_salt = crypto.createHash("sha512");
    password_salt.update(uuidv4());
    const password_hash = crypto.createHash("sha512");
    password_hash.update(password + passwordPepper + password_salt);

    await client.connect();
    const userCollection = await client.db("oop_term_project").collection("users");

    try {
      const results = await userCollection.findOne({ email: email, password_hash: password_hash.digest("hex") });
      
      return results;
    } catch (error) {
      return error;
    }
  }
  async createUser(form_obj): Promise<null | IUser> {


    const schema = Joi.object({
      username: Joi.string().alphanum().min(3).required(),
      first_name: Joi.string().alphanum().min(3).required(),
      last_name: Joi.string().alphanum().min(3).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    });

    try {
      const value = await schema.validateAsync({
        username: form_obj.username,
        first_name: form_obj.firstName,
        last_name: form_obj.lastName,
        email: form_obj.email,
        password: form_obj.password,
      });

      await client.connect();
      const userCollection = await client.db("oop_term_project").collection("users");

      if (value) {
        try {
          const password_salt = crypto.createHash("sha512");
          password_salt.update(uuidv4());
          const password_hash = crypto.createHash("sha512");
          password_hash.update(form_obj.password + passwordPepper + password_salt);

          const userDoc = {
            username: form_obj.username,
            firstName: form_obj.firstName,
            lastName: form_obj.lastName,
            email: form_obj.email,
            password_salt: password_salt.digest("hex"),
            password_hash: password_hash.digest("hex"),
          };

          let { ops: inserted } = await userCollection.insertOne(userDoc);
          return inserted[0];
        } catch (ex) {
          console.log(ex);
          return null;
        } 
      }
    } catch (err) {
      console.log(err);
      return null;
    } 

    return null;
  }
}

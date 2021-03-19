import { Request } from "express";
interface CustomReq extends Request {
  user: { username: string };
}

export default CustomReq;

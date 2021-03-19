import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500;
  const message = error.message || "An error has occured";

  req.flash("info", message);
  console.log(error);
  if (error.res_link) {
    res.redirect(error.res_link);
  }
  // if no res_link above, should automatically proceed back to controller
};

export default errorMiddleware;

import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500;
  const message = error.message || "An error has occured";

  console.dir(error);
  req.flash("error", message);
  console.dir(error);

  if (error.res_link) {
    res.redirect(error.res_link);
  }
  console.log("redirecting back to controller");
  // If nothing provided, it goes back to controller.

  // res.redirect("back");
};

export default errorMiddleware;

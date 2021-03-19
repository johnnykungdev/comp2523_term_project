import HttpException from "./HttpException";

class WrongCredentialsException extends HttpException {
  constructor() {
    super(401, "Your login details are not valid. Please try again", "/auth/login");
  }
}

export default WrongCredentialsException;

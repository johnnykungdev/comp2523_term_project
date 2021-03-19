import HttpException from "./HttpException";

class EmailAlreadyExistsException extends HttpException {
  constructor(email: string, name: string) {
    super(400, `User with email ${email} or username ${name} already exists`);
  }
}

export default EmailAlreadyExistsException;

class HttpException extends Error {
  public status: number;
  public message: string;
  public res_link: string;
  constructor(status: number, message: string, res_link?: string) {
    super(message);
    this.status = status;
    this.message = message;
    this.res_link = res_link;
  }
}

export default HttpException;

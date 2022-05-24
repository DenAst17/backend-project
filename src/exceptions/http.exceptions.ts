export default class HttpException extends Error {
    public httpCode:number;
    constructor(message:string, httpCode = 500) {
      super(message);
  
      Object.setPrototypeOf(this, new.target.prototype);
      this.httpCode = httpCode;
      Error.captureStackTrace(this);
    }
  }
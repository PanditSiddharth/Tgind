export class TelegramError extends Error {
    [key: string]: any;
    constructor(msg:any) {
      super(msg)
    }
  }
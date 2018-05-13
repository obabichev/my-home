import {ErrorHandler, Injectable} from '@angular/core';

@Injectable()
export class ErrorHandlerService {

  constructor(private errorHandler: ErrorHandler) {
  }

  public handleError(message: string): void {
    this.errorHandler.setMessage(message);
  }
}

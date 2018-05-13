import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {Subject} from 'rxjs/Subject';


@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {

  public message: Subject<string> = new Subject<string>();

  constructor() {
  }

  handleError(error) {
    this.setMessage(error.message);
    // throw error;
  }

  public setMessage(message: string): void {
    this.message.next(message);
  }
}

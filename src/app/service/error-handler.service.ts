import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ErrorHandlerService {

  public message: Subject<string> = new Subject<string>();

  constructor() {
  }

  public handleError(message: string): void {
    this.setMessage(message);
  }

  public setMessage(message: string): void {
    this.message.next(message);
  }
}

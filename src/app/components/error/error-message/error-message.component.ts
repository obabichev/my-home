import {Component, ErrorHandler, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ErrorHandlerService} from '../../../service/error-handler.service';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit, OnDestroy {

  message: string = null;
  globalErrorHandlerSubscription: Subscription;

  constructor(private errorHandlerService: ErrorHandlerService) {
  }

  ngOnInit() {
    this.globalErrorHandlerSubscription = this.errorHandlerService.message
      .subscribe(message => {
        this.message = message;
      });
  }

  ngOnDestroy() {
    this.globalErrorHandlerSubscription.unsubscribe();
  }

  clearMessage(): void {
    this.message = null;
  }
}

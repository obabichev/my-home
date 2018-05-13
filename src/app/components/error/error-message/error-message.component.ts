import {Component, ErrorHandler, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit, OnDestroy {

  message: string = null;
  globalErrorHandlerSubscription: Subscription;

  constructor(private globalErrorHandlerService: ErrorHandler) {
  }

  ngOnInit() {
    this.globalErrorHandlerSubscription = this.globalErrorHandlerService.message
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

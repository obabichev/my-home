import {Component, OnInit} from '@angular/core';
import {AuthenticationService, TokenPayload} from '../../../service/authentication.service';
import {Router} from '@angular/router';
import {ErrorHandlerService} from '../../../service/error-handler.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  credentials: TokenPayload = {
    email: '',
    name: '',
    password: ''
  };

  constructor(private auth: AuthenticationService,
              private router: Router,
              private errorHandlerService: ErrorHandlerService) {
  }

  ngOnInit() {
  }

  register() {
    this.auth.registerRequest(this.credentials)
      .subscribe(() => {
        this.router.navigate(['/wallets']);
      }, (err) => {
        console.error(err);
        this.errorHandlerService.handleError(err.error.message);
      });
  }

}

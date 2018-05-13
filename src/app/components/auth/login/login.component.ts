import {Component, OnInit} from '@angular/core';
import {AuthenticationService, TokenPayload} from '../../../service/authentication.service';
import {Router} from '@angular/router';
import {ErrorHandlerService} from '../../../service/error-handler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthenticationService,
              private router: Router,
              private errorHandlerService: ErrorHandlerService) {
  }

  ngOnInit() {
  }

  login() {
    this.auth.loginRequest(this.credentials)
      .subscribe(() => {
        this.router.navigate(['wallets']);
      }, (err) => {
        console.error(err);
        this.errorHandlerService.handleError(err.error.message);
      });
  }

}

import {Component, OnInit} from '@angular/core';
import {AuthenticationService, TokenPayload} from '../../../service/authentication.service';
import {Router} from '@angular/router';

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

  constructor(private auth: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
  }

  login() {
    this.auth.loginRequest(this.credentials)
      .subscribe(() => {
        this.router.navigate(['profile']);
      }, (err) => {
        console.error(err);
      });
  }

}

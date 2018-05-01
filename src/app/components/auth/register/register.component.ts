import {Component, OnInit} from '@angular/core';
import {AuthenticationService, TokenPayload} from '../../../service/authentication.service';
import {Router} from '@angular/router';

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
              private router: Router) {
  }

  ngOnInit() {
  }

  register() {
    this.auth.registerRequest(this.credentials)
      .subscribe(() => {
        this.router.navigate(['/wallets']);
      }, (err) => {
        console.error(err);
      });
  }

}

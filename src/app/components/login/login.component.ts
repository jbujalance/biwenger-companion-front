import { Component, OnInit } from '@angular/core';
import { ILoginRegisterPayload } from '../../model/login-register-payload';
import { LoginRegisterService } from '../../services/login-register.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public credentials: ILoginRegisterPayload = {
    email: '',
    password: ''
  }

  constructor(private authService: AuthenticationService, private loginService: LoginRegisterService, private router: Router) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/payments');
    }
  }

  login(): void {
    this.loginService.login(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/payments');
    }, err => {
      console.error(err);
    });
  }

}

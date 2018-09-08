import { Component, OnInit } from '@angular/core';
import { ILoginRegisterPayload } from '../../model/login-register-payload';
import { LoginRegisterService } from '../../services/login-register.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthenticationService, private loginService: LoginRegisterService, private router: Router) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/payments');
    }
  }

  login(): void {
    this.loginService.login(this.formToPayload()).subscribe(() => {
      this.router.navigateByUrl('/payments');
    }, err => {
      console.error(err);
    });
  }

  get email(): AbstractControl {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  private formToPayload(): ILoginRegisterPayload {
    return {
      email: this.email.value,
      password: this.password.value
    }
  }

}

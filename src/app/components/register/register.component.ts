import { Component, OnInit, OnDestroy } from '@angular/core';
import { ILoginRegisterPayload } from '../../model/login-register-payload';
import { LoginRegisterService } from '../../services/login-register.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [ Validators.required, Validators.email ]),
    password: new FormControl('', [ Validators.required, Validators.minLength(6) ])
  });

  constructor(private authService: AuthenticationService, private registerService: LoginRegisterService, private router: Router) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/payments');
    }
  }

  register(): void {
    this.registerService.register(this.formToPayload()).subscribe(() => {
      this.router.navigateByUrl('/payments');
    }, err => {
      console.error(err);
    });
  }

  get name(): AbstractControl {
    return this.registerForm.get('name');
  }

  get email(): AbstractControl {
    return this.registerForm.get('email');
  }

  get password(): AbstractControl {
    return this.registerForm.get('password');
  }

  private formToPayload(): ILoginRegisterPayload {
    return {
      name: this.name.value,
      email: this.email.value,
      password: this.password.value
    }
  }

}

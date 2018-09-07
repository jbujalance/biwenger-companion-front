import { Component, OnInit, OnDestroy } from '@angular/core';
import { ILoginRegisterPayload } from '../../model/login-register-payload';
import { LoginRegisterService } from '../../services/login-register.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  public credentials: ILoginRegisterPayload = {
    name: '',
    email: '',
    password: ''
  };
  private subscription: Subscription;

  constructor(private authService: AuthenticationService, private registerService: LoginRegisterService, private router: Router) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/payments');
    }
  }

  register(): void {
    this.subscription = this.registerService.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/payments');
    }, err => {
      console.error(err);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUserDetails } from '../model/user-details';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private token: string;
  private userDetails: IUserDetails;
  private readonly TOKEN_KEY: string = 'token';

  constructor(private router: Router) { }

  public saveToken(pToken: string): void {
    localStorage.setItem(this.TOKEN_KEY, pToken);
    this.token = pToken;
  }

  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem(this.TOKEN_KEY);
    }
    return this.token;
  }

  public logout(): void {
    this.token = undefined;
    this.userDetails = undefined;
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigateByUrl('/login');
  }

  public getUserDetails(): IUserDetails {
    if (!this.userDetails) {
      const token = this.getToken();
      if (token) {
        let payload = token.split('.')[1];
        payload = atob(payload);
        this.userDetails = JSON.parse(payload);
      } else {
        this.userDetails = null;
      }
    }
    return this.userDetails;
  }

  public isLoggedIn(): boolean {
    const userDetails = this.getUserDetails();
    return userDetails ? userDetails.exp > Date.now() / 1000 : false;
  }

  public isInRole(pRole: string): boolean {
    if (!this.isLoggedIn()) {
      return false;
    }
    let userDetails = this.getUserDetails();
    return userDetails.roles.includes(pRole);
  }
}

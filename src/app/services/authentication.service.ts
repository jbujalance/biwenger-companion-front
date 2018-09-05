import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IUserDetails } from '../model/user-details';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private token: string;
  private userDeatils: IUserDetails;
  private readonly TOKEN_KEY: string = 'token';
  private readonly HEADER_PREFIX: string = 'Bearer ';

  constructor(private router: Router) { }

  public saveToken(pToken: string): void {
    localStorage.setItem(this.TOKEN_KEY, pToken);
    this.token = pToken;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem(this.TOKEN_KEY);
    }
    return this.token;
  }

  public getTokenHeader(): string {
    return this.HEADER_PREFIX + this.getToken;
  }

  public logout(): void {
    this.token = undefined;
    this.userDeatils = undefined;
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigateByUrl('/');
  }

  public getUserDetails(): IUserDetails {
    if (!this.userDeatils) {
      const token = this.getToken();
      if (token) {
        let payload = token.split('.')[1];
        payload = atob(payload);
        this.userDeatils = JSON.parse(payload);
      } else {
        this.userDeatils = null;
      }
    }
    return this.userDeatils;
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

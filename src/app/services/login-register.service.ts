import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ILoginRegisterPayload } from '../model/login-register-payload';
import { ITokenResponse } from '../model/token-response';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {

  private readonly LOGIN_URL: string = 'https://biwengertransfers.herokuapp.com/api/login';
  private readonly REGISTER_URL: string = 'https://biwengertransfers.herokuapp.com/api/register';

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  public login(pPayload: ILoginRegisterPayload): void {
    this.request('login', pPayload);
  }

  public register(pPayload: ILoginRegisterPayload): void {
    this.request('register', pPayload);
  }

  private request(type: 'login' | 'register', pPayload: ILoginRegisterPayload): void {
    let url: string = type === 'login' ? this.LOGIN_URL : this.REGISTER_URL;
    this.http.post<ITokenResponse>(url, pPayload)
    .pipe(
      map((tokenResponse: ITokenResponse) => {
        this.authService.saveToken(tokenResponse.token);
      })
    )
  }
}

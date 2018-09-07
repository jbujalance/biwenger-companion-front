import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ILoginRegisterPayload } from '../model/login-register-payload';
import { ITokenResponse } from '../model/token-response';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {

  private readonly LOGIN_URL: string = environment.apiUrl + 'user/login';
  private readonly REGISTER_URL: string = environment.apiUrl + 'user/register';

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  public login(pPayload: ILoginRegisterPayload): Observable<ITokenResponse> {
    return this.request('login', pPayload);
  }

  public register(pPayload: ILoginRegisterPayload): Observable<ITokenResponse> {
    return this.request('register', pPayload);
  }

  private request(type: 'login' | 'register', pPayload: ILoginRegisterPayload): Observable<ITokenResponse> {
    let url: string = type === 'login' ? this.LOGIN_URL : this.REGISTER_URL;
    return this.http.post<ITokenResponse>(url, pPayload)
    .pipe(
      map((tokenResponse: ITokenResponse) => {
        this.authService.saveToken(tokenResponse.token);
        return tokenResponse;
      })
    )
  }
}

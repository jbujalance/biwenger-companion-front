import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserBalance } from '../model/user-balance';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class BalancesService {

  private readonly url: string = 'https://biwengertransfers.herokuapp.com/api/balances';
  private readonly initialCapital: number = 20_000_000;
  private httpOptions: object;

  constructor(private http: HttpClient, private authService: AuthenticationService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': authService.getTokenHeader()
      })
    };
  }

  getBalances(): Observable<IUserBalance[]> {
    return this.http.get<IUserBalance[]>(this.url, this.httpOptions)
    .pipe(
      map((userBalances: IUserBalance[]) => {
        userBalances.forEach((userBalance: IUserBalance) => userBalance.balance += this.initialCapital);
        return userBalances;
      })
    );
  }
}

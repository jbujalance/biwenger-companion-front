import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserBalance } from '../model/user-balance';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BalancesService {

  private readonly url: string = environment.apiUrl + 'balances?season=2019';
  private readonly initialCapital: number = 20_000_000;

  constructor(private http: HttpClient) { }

  getBalances(): Observable<IUserBalance[]> {
    return this.http.get<IUserBalance[]>(this.url)
    .pipe(
      map((userBalances: IUserBalance[]) => {
        userBalances.forEach((userBalance: IUserBalance) => userBalance.balance += this.initialCapital);
        return userBalances;
      })
    );
  }
}

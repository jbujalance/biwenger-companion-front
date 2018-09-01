import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserBalance } from '../model/user-balance';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BalancesService {

  private readonly url: string = 'https://biwengertransfers.herokuapp.com/api/balances';
  private readonly initialCapital: number = 20_000_000;

  constructor(private http: HttpClient) { }

  getBalances(): Observable<IUserBalance[]> {
    return this.http.get<IUserBalance[]>(this.url)
      .pipe (map((userBalances: IUserBalance[]) => {
        userBalances.forEach((userBalance: IUserBalance) => userBalance.balance += this.initialCapital);
        return userBalances;
      }));
  }
}

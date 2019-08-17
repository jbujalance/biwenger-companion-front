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
        // We copy the response in a new variable because if we modidfy the actual response,
        // we will modify the response in the cache, and we don't want that.
        // TODO The service should not be aware of the existence of the cache, the cache should return a deep copy of the cached response.
        let copyUserBalances: IUserBalance[] = [];
        userBalances.forEach((userBalance: IUserBalance) => copyUserBalances.push({...userBalance}));
        copyUserBalances.forEach((userBalance: IUserBalance) => userBalance.balance += this.initialCapital);
        return copyUserBalances;
      })
    );
  }
}

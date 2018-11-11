import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMarketSale } from '../model/market-sale';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  private readonly url: string = environment.apiUrl + 'market';

  constructor(private http: HttpClient) { }

  getMarketSales(): Observable<IMarketSale[]> {
    return this.http.get<IMarketSale[]>(this.url);
  }
}

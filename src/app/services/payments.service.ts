import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IUserPayment } from '../model/user-payment';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ISeason } from '../model/season';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  private readonly url: string = environment.apiUrl + 'payments';

  constructor(private http: HttpClient) { }

  getGlobalPayments(season: ISeason): Observable<IUserPayment[]> {
    return this.http.get<IUserPayment[]>(this.url, {
      params: new HttpParams().set('season', season.key.toString())
    });
  }
}

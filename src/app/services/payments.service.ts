import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUserPayment } from '../model/user-payment';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  private readonly url: string = environment.apiUrl + 'payments?season=2018';

  constructor(private http: HttpClient) { }

  getGlobalPayments(): Observable<IUserPayment[]> {
    return this.http.get<IUserPayment[]>(this.url);
  }
}

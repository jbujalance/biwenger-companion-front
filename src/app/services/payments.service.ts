import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUserPayment } from '../model/user-payment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  private readonly url: string = 'https://biwengertransfers.herokuapp.com/api/payments';

  constructor(private http: HttpClient) { }

  getGlobalPayments(): Observable<IUserPayment[]> {
    return this.http.get<IUserPayment[]>(this.url);
  }
}

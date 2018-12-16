import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IUserDetails } from '../model/user-details';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private readonly url: string = environment.apiUrl + 'admin';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<IUserDetails[]> {
    return this.http.get<IUserDetails[]>(this.url);
  }
}

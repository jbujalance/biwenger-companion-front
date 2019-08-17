import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISeason } from '../model/season';

@Injectable({
  providedIn: 'root'
})
export class SeasonsService {

  private readonly url: string = environment.apiUrl + 'seasons';

  constructor(private http: HttpClient) { }

  getSeasons(): Observable<ISeason[]> {
    return this.http.get<ISeason[]>(this.url);
  }

  getCurrentSeason(): Observable<ISeason> {
    return this.http.get<ISeason>(this.url + '/current');
  }
}

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRound } from '../model/round';
import { ISeason } from '../model/season';

@Injectable({
  providedIn: 'root'
})
export class RoundsService {

  private readonly url: string = environment.apiUrl + 'rounds';

  constructor(private http: HttpClient) { }

  public getRounds(season: ISeason): Observable<IRound[]> {
    return this.http.get<IRound[]>(this.url, {
      params: new HttpParams().set('season', season.key.toString())
    });
  }
}

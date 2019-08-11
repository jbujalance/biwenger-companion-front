import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRound } from '../model/round';

@Injectable({
  providedIn: 'root'
})
export class RoundsService {

  private readonly url: string = environment.apiUrl + 'rounds?season=2018';

  constructor(private http: HttpClient) { }

  public getRounds(): Observable<IRound[]> {
    return this.http.get<IRound[]>(this.url);
  }
}

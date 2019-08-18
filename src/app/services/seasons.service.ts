import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ISeason } from '../model/season';

@Injectable({
  providedIn: 'root'
})
export class SeasonsService {

  private static DEFAULT_SEASON: ISeason = {
    _id: "5d4eea7acc984376b04230af",
    key: 2019,
    name: "2019/2020"
  };
  private selectedSeason: BehaviorSubject<ISeason> = new BehaviorSubject<ISeason>(SeasonsService.DEFAULT_SEASON);
  private readonly url: string = environment.apiUrl + 'seasons';

  constructor(private http: HttpClient) {
    this.getCurrentSeason().toPromise().then((season: ISeason) => {
      this.selectedSeason.next(season);
    });
  }

  getSeasons(): Observable<ISeason[]> {
    return this.http.get<ISeason[]>(this.url);
  }

  getSelectedSeason(): Observable<ISeason> {
    return this.selectedSeason;
  }

  setSelectedSeason(season: ISeason) {
    this.selectedSeason.next(season);
  }

  getCurrentSeason(): Observable<ISeason> {
    return this.http.get<ISeason>(this.url + '/current');
  }
}

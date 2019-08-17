import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISeason } from 'src/app/model/season';
import { Subscription } from 'rxjs';
import { SeasonsService } from 'src/app/services/seasons.service';

@Component({
  selector: 'app-season-selector',
  templateUrl: './season-selector.component.html',
  styleUrls: ['./season-selector.component.css']
})
export class SeasonSelectorComponent implements OnInit, OnDestroy {

  public seasons: ISeason[];
  private seasonSubscription: Subscription;

  constructor(public seasonService: SeasonsService) { }

  ngOnInit() {
    this.getSeasons();
  }

  getSeasons(): void {
    this.seasonSubscription = this.seasonService.getSeasons()
      .subscribe((response: ISeason[]) => this.seasons = response);
  }

  ngOnDestroy(): void {
    this.seasonSubscription.unsubscribe();
  }
}

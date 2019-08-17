import { Component, OnInit, OnDestroy } from '@angular/core';
import { IRound } from '../../../model/round';
import { Subscription } from 'rxjs';
import { RoundsService } from '../../../services/rounds.service';
import { ISeason } from 'src/app/model/season';
import { SeasonsService } from 'src/app/services/seasons.service';

@Component({
  selector: 'app-rounds',
  templateUrl: './rounds.component.html',
  styleUrls: ['./rounds.component.css']
})
export class RoundsComponent implements OnInit, OnDestroy {

  public rounds: IRound[];
  private roundsSubscription: Subscription;
  private seasonSubscription: Subscription;

  constructor(private roundsService: RoundsService, private seasonService: SeasonsService) { }

  ngOnInit() {
    this.seasonSubscription = this.seasonService.getSelectedSeason().subscribe((season: ISeason) => {
      this.getRounds(season);
    });
  }

  private getRounds(season: ISeason): void {
    this.roundsSubscription = this.roundsService.getRounds(season)
      .subscribe((data: IRound[]) => this.rounds = data);
  }

  ngOnDestroy() {
    this.roundsSubscription.unsubscribe();
    this.seasonSubscription.unsubscribe();
  }

}

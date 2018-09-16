import { Component, OnInit, OnDestroy } from '@angular/core';
import { IRound } from '../../../model/round';
import { Subscription } from 'rxjs';
import { RoundsService } from '../../../services/rounds.service';

@Component({
  selector: 'app-rounds',
  templateUrl: './rounds.component.html',
  styleUrls: ['./rounds.component.css']
})
export class RoundsComponent implements OnInit, OnDestroy {

  public rounds: IRound[];
  private subscription: Subscription;

  constructor(private roundsService: RoundsService) { }

  ngOnInit() {
    this.getRounds();
  }

  private getRounds(): void {
    this.subscription = this.roundsService.getRounds()
      .subscribe((data: IRound[]) => this.rounds = data);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

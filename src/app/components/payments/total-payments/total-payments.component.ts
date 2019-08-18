import { Component, OnInit, OnDestroy } from '@angular/core';
import { IUserPayment } from '../../../model/user-payment';
import { Subscription } from 'rxjs';
import { PaymentsService } from '../../../services/payments.service';
import { SeasonsService } from 'src/app/services/seasons.service';
import { ISeason } from 'src/app/model/season';

@Component({
  selector: 'app-total-payments',
  templateUrl: './total-payments.component.html',
  styleUrls: ['./total-payments.component.css']
})
export class TotalPaymentsComponent implements OnInit, OnDestroy {

  public userPayments: IUserPayment[] = [];
  private paymentsSubscription: Subscription;
  private seasonSubscription: Subscription;

  constructor(private paymentsService: PaymentsService, private seasonService: SeasonsService) { }

  ngOnInit() {
    this.seasonSubscription = this.seasonService.getSelectedSeason().subscribe((season: ISeason) => {
      this.getPayments(season);
    });
  }

  getPayments(season: ISeason): void {
    this.paymentsSubscription = this.paymentsService.getGlobalPayments(season)
      .subscribe((data: IUserPayment[]) => this.userPayments = data);
  }

  ngOnDestroy() {
    this.paymentsSubscription.unsubscribe();
    this.seasonSubscription.unsubscribe();
  }

}

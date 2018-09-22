import { Component, OnInit, OnDestroy } from '@angular/core';
import { IUserPayment } from '../../../model/user-payment';
import { Subscription } from 'rxjs';
import { PaymentsService } from '../../../services/payments.service';

@Component({
  selector: 'app-total-payments',
  templateUrl: './total-payments.component.html',
  styleUrls: ['./total-payments.component.css']
})
export class TotalPaymentsComponent implements OnInit, OnDestroy {

  public userPayments: IUserPayment[] = [];
  private paymentsSubscription: Subscription;

  constructor(private paymentsService: PaymentsService) { }

  ngOnInit() {
    this.getPayments();
  }

  getPayments(): void {
    this.paymentsSubscription = this.paymentsService.getGlobalPayments()
      .subscribe((data: IUserPayment[]) => this.userPayments = data);
  }

  ngOnDestroy() {
    this.paymentsSubscription.unsubscribe();
  }

}

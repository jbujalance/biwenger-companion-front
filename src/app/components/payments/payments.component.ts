import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaymentsService } from '../../services/payments.service';
import { IUserPayment } from '../../model/user-payment';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit, OnDestroy {

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

import { Component, OnInit, OnDestroy } from '@angular/core';
import { BalancesService } from '../../services/balances.service';
import { IUserBalance } from '../../model/user-balance';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrls: ['./balances.component.css']
})
export class BalancesComponent implements OnInit, OnDestroy {

  public userBalances: IUserBalance[] = [];
  private balancesSubscription: Subscription;

  constructor(private balancesService: BalancesService) { }

  ngOnInit() {
    this.getUsersBalances();
  }

  getUsersBalances(): void {
    this.balancesSubscription = this.balancesService.getBalances()
      .subscribe((data: IUserBalance[]) => this.userBalances = data);
  }

  ngOnDestroy() {
    this.balancesSubscription.unsubscribe();
  }

}

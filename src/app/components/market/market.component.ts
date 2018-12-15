import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IMarketSale } from 'src/app/model/market-sale';
import { MarketService } from 'src/app/services/market.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit, OnDestroy {

  public marketSales: IMarketSale[];
  private marketSubscription: Subscription;

  constructor(private marketService: MarketService) { }

  ngOnInit() {
    this.getMarketSales();
  }

  getMarketSales(): void {
    this.marketSubscription = this.marketService.getMarketSales()
      .subscribe((data: IMarketSale[]) => this.marketSales = data);
  }

  ngOnDestroy() {
    this.marketSubscription.unsubscribe();
  }

}

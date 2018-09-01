import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaymentsComponent } from './components/payments/payments.component';
import { BalancesComponent } from './components/balances/balances.component';

const routes: Routes = [
  { path: '', redirectTo: '/payments', pathMatch: 'full' },
  { path: 'payments', component: PaymentsComponent },
  { path: 'balances', component: BalancesComponent }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

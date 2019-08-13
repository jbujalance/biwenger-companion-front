import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaymentsComponent } from './components/payments/payments.component';
import { BalancesComponent } from './components/balances/balances.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { MarketComponent } from './components/market/market.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  { path: '', redirectTo: '/payments', pathMatch: 'full' },
  { path: 'payments', component: PaymentsComponent, canActivate: [AuthGuard] },
  { path: 'balances', component: BalancesComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'balances' } },
  { path: 'market', component: MarketComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'market' } },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'admin' } },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

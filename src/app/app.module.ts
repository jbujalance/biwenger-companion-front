import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { BalancesComponent } from './components/balances/balances.component';
import { AppRoutingModule } from './/app-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AlertComponent } from './components/alert/alert.component';
import { UnauthorizedInterceptor } from './interceptors/unauthorized.interceptor';
import { TabComponent } from './components/tab/tab.component';
import { TabGroupComponent } from './components/tab-group/tab-group.component';
import { TotalPaymentsComponent } from './components/payments/total-payments/total-payments.component';
import { CollapsiblePanelComponent } from './components/collapsible-panel/collapsible-panel.component';
import { RoundsComponent } from './components/payments/rounds/rounds.component';
import { MarketComponent } from './components/market/market.component';
import { AdminComponent } from './components/admin/admin.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { DeviceDetectorModule } from 'ngx-device-detector';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PaymentsComponent,
    BalancesComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    AlertComponent,
    TabComponent,
    TabGroupComponent,
    TotalPaymentsComponent,
    CollapsiblePanelComponent,
    RoundsComponent,
    MarketComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    DeviceDetectorModule.forRoot()
  ],
  providers: [
    AuthGuard,
    RoleGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private swPush: SwPush) {
    this.subscribeToNotifications();
  }

  subscribeToNotifications(): void {
    if (!this.swPush.isEnabled) {
      return;
    }
    this.swPush.requestSubscription({
      serverPublicKey: environment.pushServerPublicKey
    })
    .then(subscription => console.log(subscription))
    .catch(err => console.error('Could not subscribe to notifications', err));
  }
}

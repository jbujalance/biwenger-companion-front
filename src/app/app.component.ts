import { Component } from '@angular/core';
import { PushNotificationService } from './services/push-notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private pushService: PushNotificationService) {
    // We request the user to allow the push notifications in the app component.
    // However, the actual request will only take place if the user is already logged in,
    // in order to be able to identify the resulting push subscription with the user id.
    this.pushService.requestPushSubscription();
  }

}

import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { IIdentifiedPushSubscription } from '../model/identified-push-subscription';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  private readonly URL: string = environment.apiUrl + 'push/subscribe';

  constructor(private swPush: SwPush, private http: HttpClient, private authService: AuthenticationService) { }

  requestPushSubscription(): void {
    if (!this.swPush.isEnabled || !this.authService.isLoggedIn()) {
      console.warn('The subscription to notifications has not been requested.');
      return;
    }
    this.swPush.requestSubscription({
      serverPublicKey: environment.pushServerPublicKey
    })
    .then((subscription: PushSubscription) => this.sendSubscriptionToServer(subscription))
    .catch(err => console.error('Could not subscribe to notifications', err));
  }

  private sendSubscriptionToServer(subscription: PushSubscription): void {
    let postBody: IIdentifiedPushSubscription = subscription.toJSON();
    postBody.userId = this.authService.getUserDetails()._id;
    this.http.post(this.URL, postBody);
  }
}

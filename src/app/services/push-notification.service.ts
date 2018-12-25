import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { IIdentifiedPushSubscription } from '../model/identified-push-subscription';
import { catchError } from 'rxjs/operators';

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
    .then((subscription: PushSubscription) => this.sendSubscriptionToServer(subscription).subscribe(
      data => console.info('The push subscription has been successfuly sent to the server'),
      err => console.error('The push subscription was not successfuly sent to the server: ' + err)
    ))
    .catch(err => console.error('Could not request a push subscription: ', err));
  }

  private sendSubscriptionToServer(subscription: PushSubscription) {
    let postBody: IIdentifiedPushSubscription = subscription.toJSON();
    postBody.userId = this.authService.getUserDetails()._id;
    return this.http.post(this.URL, postBody)
      .pipe(
        catchError(this.handlePostError)
      );
  }

  private handlePostError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred on the client side while sending the subscription to the backend:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened when posting the susbscription to the backend server; please try again later.');
  }
}

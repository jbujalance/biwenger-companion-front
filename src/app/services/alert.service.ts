import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { IAlert } from '../model/alert';
import { Router, NavigationStart } from '@angular/router';
import { AlertType } from '../model/alert-type';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private subject = new Subject<IAlert>();
  private keepAfterRouteChange = false;

  constructor(private router: Router) {
    // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          // only keep for a single route change
          this.keepAfterRouteChange = false;
        } else {
          // clear alert messages
          this.clear();
        }
      }
    });
  }

  public getAlert(): Observable<IAlert> {
    return this.subject.asObservable();
  }

  public success(message: string, keepAfterRouteChange = false) {
    this.alert(AlertType.Success, message, keepAfterRouteChange);
  }

  public error(message: string, keepAfterRouteChange = false) {
    this.alert(AlertType.Error, message, keepAfterRouteChange);
  }

  public info(message: string, keepAfterRouteChange = false) {
    this.alert(AlertType.Info, message, keepAfterRouteChange);
  }

  public warn(message: string, keepAfterRouteChange = false) {
    this.alert(AlertType.Warning, message, keepAfterRouteChange);
  }

  private alert(type: AlertType, message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next(<IAlert>{ type: type, message: message });
  }

  public clear() {
    // clear alerts
    this.subject.next();
  }
}

import { Component, OnInit } from '@angular/core';
import { IAlert } from '../../model/alert';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  alerts: IAlert[] = [];
 
  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.getAlert().subscribe((alert: IAlert) => {
      if (!alert) {
          // clear alerts when an empty alert is received
          this.alerts = [];
          return;
      }
      // add alert to array
      this.alerts.push(alert);
    });
  }

  public removeAlert(alert: IAlert): void {
    this.alerts = this.alerts.filter(x => x !== alert);
  }

  public cssClass(alert: IAlert): string {
    if (!alert) {
      return;
    }
    return alert.type;
  }
}

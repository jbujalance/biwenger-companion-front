import { Component, OnInit, OnDestroy } from '@angular/core';
import { IUserDetails } from 'src/app/model/user-details';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  public users: IUserDetails[];
  private usersSubscription: Subscription;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.usersSubscription = this.adminService.getUsers()
      .subscribe((data: IUserDetails[]) => this.users = data);
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
  }

}

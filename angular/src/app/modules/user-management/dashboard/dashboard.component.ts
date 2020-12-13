import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../../../services/logout.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  sideBarOpen = false;

  fixed = false;
  fixedBottomGap = 0;
  fixedTopGap = 0;

  constructor(private logoutService: LogoutService) { }

  ngOnInit(): void {
  }

  sideBarToggler(ev) {
    this.sideBarOpen = !this.sideBarOpen;
  }

  logout() {
    Swal.fire({
      title: 'Are you sure to logout',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Logout',
      icon: 'warning'
    }).then(res => {
      if (res.value) {
        this.logoutService.logout();
      }
    });
  }

  hideSide() {
    if (this.sideBarOpen === true) {
      this.sideBarOpen = false;
    }
  }

}

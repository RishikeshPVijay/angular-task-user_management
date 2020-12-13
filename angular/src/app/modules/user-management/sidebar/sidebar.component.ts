import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LogoutService } from '../../../services/logout.service';
import { IsLoggedInService } from '../../../services/is-logged-in.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {

  constructor( private isAdminService: IsLoggedInService) { }

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  @Output() logoutClick: EventEmitter<any> = new EventEmitter();

  isAdmin = false;

  ngOnInit(): void {
    this.isAdminFn();
  }

  isAdminFn() {
    this.isAdminService.isAdmin().subscribe(
      res => {
        if (res['authenticated']) {
          if (res['admin']) {
            this.isAdmin = true;
          }
        }
      },
      err => {
      }
    )
  }
  

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  logout() {
    this.logoutClick.emit();
  }

}

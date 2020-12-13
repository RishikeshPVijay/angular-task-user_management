import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UserManagementService } from '../../../services/user-management.service';
import Swal from 'sweetalert2';

export interface UserManagementItem {
  first_name: string;
  last_name: string;
  email: string;
}

@Component({
  selector: 'app-user-requests',
  templateUrl: './user-requests.component.html',
  styleUrls: ['./user-requests.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class UserRequestsComponent implements OnInit {

  userData: UserManagementItem[] = [];
  dataSource = new MatTableDataSource<UserManagementItem>(this.userData);


  displayedColumns = ['name', 'email', 'accept/reject'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<UserManagementItem>;

  constructor(
    private api: UserManagementService
  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getUserRequests();
  }

  public getUserRequests() {
    let resp = this.api.getUserRequests();

    resp.subscribe(res => {
      this.dataSource.data = res as UserManagementItem[];
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  accept(element) {
    Swal.fire({
      title: 'Accept user request?',
      text: `Name: ${element.first_name} ${element.last_name}`,
      icon: 'question',
      confirmButtonText: 'Accept',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      preConfirm: () => {
        this.api.acceptUserRequest(element.email).subscribe(
          res => {
            if (res['accepted']) {
              Swal.fire({
                title: 'Registration request accepted',
                text: `Register request of ${element.first_name} ${element.last_name} accepted`,
                icon: 'success'
              });
              let index = this.dataSource.data.indexOf(element);
              if (index > -1) {
                this.dataSource.data.splice(index, 1);
                this.dataSource._updateChangeSubscription();
              }
            } else if (res['error']) {
              Swal.fire({
                title: 'Server error',
                text: 'Something went wrong!',
                icon: 'error'
              });
            } else {
              Swal.fire({
                title: 'Unknown error',
                text: 'Something went wrong!',
                icon: 'error'
              });
            }
          },
          err => {
            Swal.fire({
              title: 'Server error',
              text: 'Something went wrong!',
              icon: 'error'
            });
          }
        )
      }
    })
  }

  reject(element) {
    Swal.fire({
      title: 'Reject user request?',
      text: `Name: ${element.first_name} ${element.last_name}`,
      icon: 'warning',
      confirmButtonText: 'Reject',
      showCancelButton: true,
      confirmButtonColor: 'red',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        this.api.rejectUserRequest(element.email).subscribe(
          res => {
            if (res['rejected']) {
              Swal.fire({
                title: 'Registration request rejected',
                text: `Register request of ${element.first_name} ${element.last_name} rejected`,
                icon: 'warning'
              });
              let index = this.dataSource.data.indexOf(element);
              if (index > -1) {
                this.dataSource.data.splice(index, 1);
                this.dataSource._updateChangeSubscription();
              }

            } else if (res['error']) {
              Swal.fire({
                title: 'Server error',
                text: 'Something went wrong!',
                icon: 'error'
              });
            } else {
              Swal.fire({
                title: 'Unknown error',
                text: 'Something went wrong!',
                icon: 'error'
              });
            }
          },
          err => {
            Swal.fire({
              title: 'Server error',
              text: 'Something went wrong!',
              icon: 'error'
            });
          }
        )
      }
    });
  }

}
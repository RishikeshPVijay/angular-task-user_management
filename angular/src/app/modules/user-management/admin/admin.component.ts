import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UserManagementService } from '../../../services/user-management.service';

export interface UserManagementItem {
  first_name: string;
  last_name: string;
  email: string;
  phone: number;
  address: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit {
  userData: UserManagementItem[] = [];
  dataSource = new MatTableDataSource<UserManagementItem>(this.userData);


  displayedColumns = ['name', 'email', 'phone', 'address'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<UserManagementItem>;

  constructor(public api: UserManagementService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getUsers();
  }

  public getUsers() {
    let resp = this.api.getUsers();

    resp.subscribe(res => {
      this.dataSource.data = res as UserManagementItem[];
    })
  }

  applyFilter(filterValue: string) {
    this.api.getUsersBySearch(filterValue).subscribe(
      res => {
        if(!res['error']) {
          this.dataSource.data = res as UserManagementItem[];
        }
      },
      err => {

      }
    )
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

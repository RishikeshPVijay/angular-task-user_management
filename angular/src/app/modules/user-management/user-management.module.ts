import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { AdminComponent } from './admin/admin.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserRequestsComponent } from './user-requests/user-requests.component';
import { DefualtComponent } from './defualt/defualt.component';


@NgModule({
  declarations: [AdminComponent, HeaderComponent, SidebarComponent, DashboardComponent, UserRequestsComponent, DefualtComponent],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatMenuModule,
    MatListModule,
    MatSidenavModule,
    MatButtonModule,
    SweetAlert2Module.forRoot()
  ]
})
export class UserManagementModule { }

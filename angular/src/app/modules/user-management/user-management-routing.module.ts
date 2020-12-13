import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthGuardService } from '../../services/auth-guard.service';
import { AdminGuardService } from '../../services/admin-guard.service'
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserRequestsComponent } from './user-requests/user-requests.component';
import { DefualtComponent } from './defualt/defualt.component';

const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService], children: [
      { path: '', component: DefualtComponent },
      { path: 'admin/all-users', component: AdminComponent, canActivate: [AdminGuardService] },
      { path: 'admin/user-requests', component: UserRequestsComponent, canActivate: [AdminGuardService] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }

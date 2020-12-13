import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private http: HttpClient) { }

  getUsers() {
    let url = environment.app_url + '/admin/get-users';
    return this.http.get(url, { withCredentials: true });
  }

  getUsersBySearch(search) {
    let url = environment.app_url + '/admin/get-users/'+search;
    return this.http.get(url, { withCredentials: true });
  }

  getUserRequests() {
    let url = environment.app_url + '/admin/user-requests';
    return this.http.get(url, { withCredentials: true });
  }

  acceptUserRequest(email) {
    let url = environment.app_url + '/admin/user-request-accept';
    return this.http.post(url, { email: email }, { withCredentials: true });
  }

  rejectUserRequest(email) {
    let url = environment.app_url + '/admin/user-request-reject';
    return this.http.post(url, { email: email }, { withCredentials: true });
  }
}

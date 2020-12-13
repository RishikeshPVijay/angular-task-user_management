import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedInService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private location: Location
  ) { }

  isLoggedIn() {

    let url = environment.app_url + '/isAuthenticated';
    return this.http.post(url, {}, { withCredentials: true }).subscribe(
      res => {
        if (res['authenticated']) {
          this.router.navigate(['/dashboard']);
          this.location.replaceState('/dashboard');
        }
      },
      err => {
      }
    )
  }

  isAdmin() {
    let url = environment.app_url + '/isAuthenticated';
    return this.http.post(url, {}, { withCredentials: true });
  }
}


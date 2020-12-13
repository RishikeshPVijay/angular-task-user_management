import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private location: Location
  ) { }

  logout() {
    let url = environment.app_url + '/logout';
    return this.http.get(url, { withCredentials: true }).subscribe(
      res => {
        
        if (res['logout']) {
          this.router.navigate(['/login']);
          this.location.replaceState('/login');
        }
      },
      err => {

      }
    );
  }
}

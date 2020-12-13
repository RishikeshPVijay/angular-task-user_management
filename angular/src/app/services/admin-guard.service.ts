import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

  constructor(private route: Router, private http: HttpClient) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    let url = environment.app_url + '/isAuthenticated';
    return this.http.post(url, {}, { withCredentials: true }).pipe(map(res => {
      if (res['admin']) {
        return true;
      } else {
        this.route.navigate(['dashboard']);
        return false;
      }
    }),
      catchError(err => {
        return of(false);
      })
    );
  }
}	
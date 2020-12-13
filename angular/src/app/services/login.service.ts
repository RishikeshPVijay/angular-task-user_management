import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  postData(data) {
    let url = environment.app_url + '/login';
    return this.http.post(url, data, { withCredentials: true });
  }
}

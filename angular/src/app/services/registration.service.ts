import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  postData(data) {
    let url = environment.app_url+'/register';
    return this.http.post(url, data);
  }

  emailExistCheck(data) {
    let url = environment.app_url+'/register/email-exists-check/'+data;
    return this.http.get(url);
  }
}

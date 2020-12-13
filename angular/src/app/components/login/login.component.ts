import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../services/login.service';
import { IsLoggedInService } from '../../services/is-logged-in.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  constructor(
    private api: LoginService,
    private isLoggedIn: IsLoggedInService,
    private router: Router,
    private location: Location,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn.isLoggedIn();
  }

  emailDoesntExist = false;
  passwordIncorrect = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rememberme: new FormControl(false)
  })


  login() {
    let data = this.loginForm.value;
    this.api.postData(data).subscribe(
      res => {

        if (res['login'] === true) {

          this.router.navigate(['/dashboard']);
          this.location.replaceState('/dashboard');

        } else if(res['registered'] === false) {
          
          this.toastr.info('Your registration request hasn\'t been accepted yet', 'Registration pending');

        } else if(res['rejected']) {

          this.toastr.error('Your registration request has been rejected by the admin', 'Request rejected');

        }else if (res['login'] === false && res['password'] === false) {

          this.loginForm.setValue({
            email: this.loginForm.value['email'],
            password: null,
            rememberme: this.loginForm.value['rememberme']
          });
          this.passwordIncorrect = true;

        } else if (res['login'] === false && res['email'] === false) {

          this.loginForm.setValue({
            email: this.loginForm.value['email'],
            password: null,
            rememberme: false
          });
          this.loginForm.get('email').setErrors({ 'invalid': true });
          this.emailDoesntExist = true;

        } else if (res['login'] === false && res['error'] === true) {

          this.toastr.error('Something went wrong!', 'Server error');

        } else {
          this.toastr.error('Something went wrong!', 'Unknown error');
        }

      },
      err => {
        this.toastr.error('Something went wrong!', 'Server error');
      }
    )
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

}

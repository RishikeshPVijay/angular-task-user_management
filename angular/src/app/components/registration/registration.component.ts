import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

import { RegistrationService } from '../../services/registration.service';
import { IsLoggedInService } from '../../services/is-logged-in.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class RegistrationComponent implements OnInit {

  constructor(
    private api: RegistrationService,
    private isLoggedIn: IsLoggedInService,
    private toastr: ToastrService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.isLoggedIn.isLoggedIn();
  }


  registrationForm = new FormGroup({

    firstName: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]*')
    ]),

    lastName: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]*')
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]*'),
      Validators.minLength(10),
      Validators.maxLength(10)
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9, ]*')
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    confPassword: new FormControl('', [
      Validators.required
    ]),
  }, this.passwordMatch)

  passwordMatch(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confPassword').value) {
      c.get('confPassword').setErrors({ 'invalid': true });
      return { invalid: true };
    } else {
      c.get('confPassword').setErrors(null);
    }
  }

  emailExists = false;


  keyup() {
    if (this.registrationForm.get('email').valid) {
      this.emailExists = false;
      let data = this.registrationForm.get('email').value;
      this.api.emailExistCheck(data).subscribe(res => {
        if (res['exists'] === true) {
          this.registrationForm.setErrors({ 'invalid': true })
          this.registrationForm.get('email').setErrors({ 'invalid': true })
          this.emailExists = true;
        }

      });

    }
  }


  register() {

    let data = this.registrationForm.value;
    this.api.postData(data).subscribe(
      res => {

        if (res['register'] === true) {
          if (res['admin'] === true ) {
            this.toastr.success('Login to continue', 'Welcome, admin, to the "APP"');
          } else {
            this.toastr.success('Admin will accept your registration request', 'Registration Request sent');
          }
          this.router.navigate(['/login']);
          this.location.replaceState('/login');
        } else if (res['register'] === false && res['userExists'] === true) {
          this.registrationForm.setErrors({ 'invalid': true })
          this.registrationForm.get('email').setErrors({ 'invalid': true })
          this.emailExists = true;
        } else if (res['register'] === false && res['error']) {
          this.toastr.error('Something went wrong!', 'Server error');
        } else if (res['msg']) {
          res['msg'].forEach(msg => {
            this.toastr.error(Object.values(msg)[0].toString(), 'Error');
          });
        }
      },
      
      err => {
        this.toastr.error('Something went wrong!', 'Server error');
      }
    );
  }


}

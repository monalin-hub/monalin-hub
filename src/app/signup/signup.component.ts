import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  faLock = faUser;

  public signupForm !: FormGroup;
  constructor(private fb: FormBuilder, private api: ApiService, private route: Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(6)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]],
      addr: ['', Validators.required],
      dob: ['']
    });
  }

  signup() {
    if (this.signupForm.invalid) {
      return;
    }
    this.api.addManager(this.signupForm.value).subscribe(
      data => {
        Swal.fire({
          title: 'Your Registration has been successfully',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
        this.route.navigate(['../login']);
      },
      error => {
        Swal.fire({
          title: 'Your Registration has been Failed',
          icon: 'warning',
          timer: 2000,
          showConfirmButton: false
        });
      });
  }

}

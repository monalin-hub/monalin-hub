import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  faLock = faUser;

  public signupForm !: FormGroup;
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(6)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]],
      addr: ['', Validators.required],
      dob: ['']
    });
  }
  private isAdmin = false;

  signup(): void {
    this.api.getManager().subscribe((result) => {
      for (var i = 0; i < result.length; i++) {
        if (this.signupForm.value.email === result[i].email) {
          this.isAdmin = true;
          Swal.fire({
            title: 'User Name already taken',
            icon: 'warning',
            timer: 2000,
            showConfirmButton: false
          });
          break
        }
        else {
          this.isAdmin = false;
        }
      }
      if (!this.isAdmin) {
        this.api.addManager(this.signupForm.value).subscribe(
          data => {
            Swal.fire({
              title: 'Your Registration has been successfully',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false
            });
            this.router.navigate(['../login']);
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
    },
      (err: Error) => {
        alert(err.message);
      }
    );
  }

}


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  faLock = faLock;
  loginForm !: FormGroup;
  private isAdmin = false;
  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute, private fb:FormBuilder) {}

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe(
        (result) => {
          for( var i=0; i<result.length ; i++) {
            if(this.loginForm.value.email === result[i].email && this.loginForm.value.password === result[i].password) {
              this.isAdmin = true;
              this.auth.setToken("test");
              this.router.navigate(['/dashboard']);
            }
          }

          if (!this.isAdmin) {
            alert("No Admin");
          }
        },
        (err: Error) => {
          alert(err.message);
        }
      );
    }
  }

 
}

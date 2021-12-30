import { Observable, BehaviorSubject, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Manager } from 'src/app/signup/manager.mode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  api = 'http://localhost:3000/SignupUsers'
  private userSubject: BehaviorSubject<Manager>;
  public user: Observable<Manager>;

  constructor(private router: Router, private apiService: ApiService, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<Manager>(JSON.parse(localStorage.getItem('user') || '{}'));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): Manager {
    return this.userSubject.value;
  }

  login({ email, password }: any) {
    return this.http.get<any>(this.api)
        .pipe(map((res: any) => {
    return res;
      }))   
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  
  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('token');  
    this.router.navigate(['login']);
  }
}
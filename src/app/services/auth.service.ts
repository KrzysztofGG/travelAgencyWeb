import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { User } from '../user';
import { Router } from '@angular/router';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  roles: string[] = [];
  username?: string;
  isBanned: boolean = false;

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions)
  }


  register(username: string, email: string, password: string, isBanned: boolean): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username,
      email,
      password,
      isBanned
    }, httpOptions);
  }

  refreshToken(token: string) {
    return this.http.post(AUTH_API + 'refreshtoken', {
      refreshToken: token
    }, httpOptions);
  }

   logout(): void {
    this.tokenStorageService.signOut();

    this.isLoggedIn = false;
    this.roles = [];
    this.router.navigate(['home']);
    // window.location.reload();
  }
  
  // registerUser(user: any){
  //   this.http.post(this.userURL + "register", user, this.httpOptions).subscribe(res => {
  //     localStorage.setItem('currentUser', JSON.stringify(res));
  //     this.userData = res;
  //     // this.tripsService.httpOptions.headers.append('authorization', `Bearer ${this.userData.token}`)
  //     alert("Register successful");
  //   }, 
  //   err => alert("Register error")
  //   )
  //   console.log(this.userData);
  // }

  // loginUser(user: any){
  //     this.http.post(this.userURL + "login", user, this.httpOptions).subscribe(res => {
  //       localStorage.setItem('currentUser', JSON.stringify(res));
  //       this.userData = res;
  //       // localStorage.setItem('token', this.userData.token);
  //       // this.tripsService.httpOptions.headers = this.tripsService.getLoggedInUser(localStorage.getItem('currentUser'));
  //       console.log(JSON.parse(localStorage.getItem('currentUser') || '{}').token)
  //       alert("Login successful");
  //     },
  //     err => alert("Login error")
  //     )
  // }

  // signOut(){
  //   localStorage.removeItem('currentUser');
  //   this.userData = null;
  // }

}

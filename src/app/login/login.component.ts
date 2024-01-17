import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { TokenStorageService } from '../services/token-storage.service';


const TOKEN_KEY = 'auth-token';
const REFRESHTOKEN_KEY = 'auth-refreshtoken';
const USER_KEY = 'auth-user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  isLoginFailed : boolean = false;
  // isLoggedIn = false;
  errorMessage = "Invalid login";
  roles: string[] = [];

  constructor(public authService: AuthService, private tokenStorage: TokenStorageService){}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      
      // this.isLoggedIn = true;

      this.roles = this.tokenStorage.getUser().roles;
    }
  }



  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  onSubmit(){
    if(!this.loginForm.valid){
      this.isLoginFailed = true;
      return;
    }
    // this.isLoginFailed  = false;
    // this.isLoggedIn = true;
  
    const user = {
      username: this.loginForm.value.username!,
      password: this.loginForm.value.password!
    }
    this.authService.login(user.username, user.password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveRefreshToken(data.refreshToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.authService.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;

        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
    // this.auth.loginUser(data);
    // this.loginForm.reset();
  }
  reloadPage(): void {
    window.location.reload();
  }
}

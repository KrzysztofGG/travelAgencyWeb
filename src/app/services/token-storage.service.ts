import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, afterNextRender } from '@angular/core';


const TOKEN_KEY = 'auth-token';
const REFRESHTOKEN_KEY = 'auth-refreshtoken';
const USER_KEY = 'auth-user';


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  // sessionStorage: any;
  // constructor(@Inject(DOCUMENT) private document: Document) {
  //   this.sessionStorage = document.defaultView?.sessionStorage;
  //   console.log(this.sessionStorage);
  //  }

  // accessToken: string | null = null; 
  // refreshToken: string | null = null;
  // user: string | null = null;
  

  signOut(): void {
    window.sessionStorage.clear();
    // this.accessToken = null;
    // this.refreshToken = null;
    // this.user = null;
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    // this.accessToken = token;

    const user = this.getUser();
    if (user.id) {
      this.saveUser({ ...user, accessToken: token });
    }
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
    
    // let token: string | null = ""
    // afterNextRender(() =>{
    //   token = window.sessionStorage.getItem(TOKEN_KEY);
    // });
    // return token;
    // return this.accessToken;
  }

  public saveRefreshToken(token: string): void {
    window.sessionStorage.removeItem(REFRESHTOKEN_KEY);
    window.sessionStorage.setItem(REFRESHTOKEN_KEY, token);
    // this.refreshToken = token;
  }

  public getRefreshToken(): string | null {
    return window.sessionStorage.getItem(REFRESHTOKEN_KEY);
    // return this.refreshToken;
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    // this.user = JSON.stringify(user);
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    // const user = this.user;
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

}

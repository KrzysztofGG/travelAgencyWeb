import { Injectable } from '@angular/core';
import { User } from '../user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
import { HistoryRecord } from './history.service';

const ADMIN_API = 'http://localhost:8080/api/admin/';
const USERS_KEY = 'users'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public users!: User[];

  constructor(private http: HttpClient, private tokenService: TokenStorageService) {
    // this.getUsers();
   }

  async getUsers(){
    const headers = this.createAuthHeaders();
    this.http.get<User[]>(ADMIN_API + 'users', { headers }).subscribe(
      data => {
        window.sessionStorage.removeItem(USERS_KEY);
        window.sessionStorage.setItem(USERS_KEY, JSON.stringify(data));
      },
      err => {
        console.log("Users load error: " + err.error.message);
      }
    )
    this.users = <User[]>JSON.parse(window.sessionStorage.getItem(USERS_KEY) || "").usersWithRoleNames;
  }

  // updateUser(_id: string, roles: string[], isBanned: boolean, purchaseHistory: HistoryRecord[]){
    updateUser(userUpdated: User){
    const headers = this.createAuthHeaders();
    this.http.put<any>(ADMIN_API + 'user/' + userUpdated._id, {userUpdated}, {headers}).subscribe(
      data => {
        console.log(`User: ${userUpdated._id} updated successfully`);
        console.log(data.user);
        this.tokenService.saveUser(data.user);
      },
      err => {
        console.log(`User ${userUpdated._id} update error: ` + err.error.message);
      }
    )
  }

  patchUser(id: string, rolesNew: string[], isBanned: boolean){
    const headers = this.createAuthHeaders();

    this.http.patch<any>(ADMIN_API + 'user/' + id, {rolesNew, isBanned}, {headers}).subscribe(
      data =>{
        console.log(data);
      },
      err => {
        console.log(`User ${id} patch error`);
      }
    )
  }

  // updatePurchaseHistory(user: User, purchaseHistory: HistoryRecord[]){
  //   const headers = this.createAuthHeaders();
  //   console.log(user._id, purchaseHistory);
  //   this.http.patch(ADMIN_API + 'user/' + user._id, {purchaseHistory}, {headers}).subscribe(
  //     data =>{
  //       console.log(`Purchase History updated for User${user._id}`);
  //       this.getUsers();
  //     },
  //     err => {
  //       console.log(`Purchase History update for User ${user._id}error: ` + err.error.message);
  //     }

  //   )
  // }

  public createAuthHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': this.tokenService.getToken() || '',
    });
    return headers;
  }
}

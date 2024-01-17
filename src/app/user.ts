import { HistoryRecord } from "./services/history.service"

export interface User{
    _id: string,
    __v: number,
    username: string,
    email: string,
    password: string,
    roles: string[],
    isBanned: boolean
    purchaseHistory: HistoryRecord[]
}

// export class User {
//     _id: String;
//     name: String;
//     email: String;
//     password: String;
//     roles: Roles;

//     // constructor(_id: String, name: String, email: String,
//     //     password: String, isBanned: boolean, roles: String[]){
//     //     this._id =_id;
//     //     this.name = name;
//     //     this.email = email;
//     //     this.password = password;
//     // }
//     constructor(userData: any){
//         this._id = userData._id;
//         this.name = userData.name;
//         this.email = userData.email;
//         this.password = userData.password;
//         if(userData.roles != null){
//             this.roles = userData.roles;
//         } else 
//             this.roles= {
//                 client: true,
//                 guest: true,
//                 manager: false,
//                 admin: false,
//                 banned: false
//             };
//     }
// }

// export interface Roles {
//     guest: boolean;
//     client: boolean;
//     manager: boolean;
//     admin: boolean;
//     banned: boolean;
// }
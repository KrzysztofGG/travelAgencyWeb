import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-single-user',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './single-user.component.html',
  styleUrl: './single-user.component.css'
})
export class SingleUserComponent implements OnInit{
  @Input() user!: User;
  updateForm: any;

  constructor(private userService: UserService){}
  ngOnInit(): void {
    this.updateForm = new FormGroup({
      user: new FormControl(this.user.roles.includes("user"), [Validators.required]),
      moderator: new FormControl(this.user.roles.includes("moderator"), [Validators.required]),
      admin: new FormControl(this.user.roles.includes("admin"), [Validators.required]),
      isBanned: new FormControl(this.user.isBanned, [Validators.required]),
    });
  }


  onSubmit(){
    if(!this.updateForm.valid){
      console.log("form Invalid");
      return;
    }
    let newRoles = [];
    let isBanned = this.updateForm.value.isBanned;

    if(this.updateForm.value.user)
      newRoles.push("user");
    if(this.updateForm.value.moderator)
      newRoles.push("moderator");
    if(this.updateForm.value.admin)
      newRoles.push("admin");

    this.user.roles = newRoles;
    this.user.isBanned = isBanned;
    this.userService.patchUser(this.user._id, newRoles, isBanned);
    // this.userService.updateUser(this.user);
  }
}

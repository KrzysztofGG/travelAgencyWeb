import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { SingleUserComponent } from './single-user/single-user.component';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [SingleUserComponent, NgFor],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent implements OnInit{

  constructor(public userService: UserService){}
  ngOnInit(): void {
    this.userService.getUsers();
  }
;

  

}

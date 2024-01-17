import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private authService: AuthService){}

  isSignUpFailed: boolean = false;
  isSuccessful: boolean = false;
  errorMessage = "Invalid register"

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  onSubmit(){
    if(!this.registerForm.valid){
      this.isSignUpFailed = true;
      console.log(this.registerForm);
      return;
    }
    // this.isSignUpFailed = false;
    // this.isSuccessful = true;
    const user = {
      username: this.registerForm.value.username!,
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!,
      isBanned: false
    }

    this.authService.register(user.username, user.email, user.password, user.isBanned).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    )
    // this.auth.registerUser(user);
    this.registerForm.reset();


  }
}

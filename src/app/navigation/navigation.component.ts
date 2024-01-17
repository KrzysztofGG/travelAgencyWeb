import { Component } from '@angular/core';
import { SummaryValueComponent } from '../summary-value/summary-value.component';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { Trip } from '../trip';
import { AuthService } from '../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [SummaryValueComponent, RouterOutlet, RouterLink, RouterModule, NgIf],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {

  constructor(public authService: AuthService){}

  logoutClick(){
    this.authService.logout();
  }

 
  
}

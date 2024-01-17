import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Trip } from '../trip';
import { RouterLink, RouterModule } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-summary-value',
  standalone: true,
  imports: [NgStyle, RouterLink, RouterModule],
  templateUrl: './summary-value.component.html',
  styleUrl: './summary-value.component.css'
})
export class SummaryValueComponent {
  constructor(public cartService: CartService){}

}

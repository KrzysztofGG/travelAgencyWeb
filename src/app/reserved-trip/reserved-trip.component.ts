import { NgClass, NgFor, NgIf, NgStyle, UpperCasePipe  } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Trip } from '../trip';
import { CartService } from '../services/cart.service';


@Component({
  selector: 'app-reserved-trip',
  standalone: true,
  imports: [NgClass, NgStyle, UpperCasePipe, NgIf],
  templateUrl: './reserved-trip.component.html',
  styleUrl: './reserved-trip.component.css'
})
export class ReservedTripComponent {

  constructor(public cartService: CartService){}

  @Input() trip!: Trip;
  // @Input() userReservations!: number;
  // @Input() reservedTrips!: Map<Trip, number>;
  // @Input() isTripCheckedToBuy!: Map<Trip, boolean>;

  includedInPayment: boolean = true;
  // // @Output() notifyRes: EventEmitter<number> = new EventEmitter<number>();
  // @Output() notifyInclusion: EventEmitter<any> = new EventEmitter<any>();

  onAddClick(){
    if(this.trip.availablePlaces > 0){
      this.trip.availablePlaces--;
      
      // this.userReservations++;

      // this.reservedTrips.set(this.trip, this.userReservations)
      // this.notifyRes.emit(this.trip.price);
      this.cartService.addItemToCart(this.trip);
    }
  }
  onRemoveClick(){
    if(this.trip.availablePlaces < this.trip.maxPlaces){
      this.trip.availablePlaces++;
      // this.userReservations--;

      // this.reservedTrips.set(this.trip, this.userReservations)
      // this.notifyRes.emit(-this.trip.price);
      this.cartService.removeItemFromCart(this.trip);
    }
  }
  changePaymentInclusion(event: any){
    this.includedInPayment = !this.includedInPayment;

    this.cartService.changeTripInclusion(this.trip, this.includedInPayment)
    // this.notifyInclusion.emit(this.trip);
    // this.notifyInclusion.emit({trip: this.trip, removeFromPayment: !this.includedInPayment});


    // console.log(this.isTripCheckedToBuy);
    // this.isTripCheckedToBuy.set(this.trip, !this.isTripCheckedToBuy.get(this.trip))
  }
  
}


import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Trip } from '../trip';
import { NgClass, NgIf, NgStyle, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TripRatingComponent } from '../trip-rating/trip-rating.component';
import { CartService } from '../services/cart.service';
import { TripsService } from '../services/trips.service';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-single-trip',
  standalone: true,
  imports: [NgIf, NgStyle, NgClass, FormsModule, UpperCasePipe, TripRatingComponent, RouterModule ],
  templateUrl: './single-trip.component.html',
  styleUrl: './single-trip.component.css'
})
export class SingleTripComponent implements OnInit{

  @Input() trip!: Trip;
  // @Input() isCheap!: boolean;
  // @Input() isExpensive!: boolean;

  @Output() notifyDelete: EventEmitter<Trip> = new EventEmitter<Trip>();

  selectedCurrency: string = 'PLN';
  plnToEuro: number = 0.23;
  plnToDollar: number = 0.25;
  
  priceToShow!: number;

  constructor(private tripsService: TripsService, private cartService: CartService, public authService: AuthService){}
  // availableSpots!: number;
  ngOnInit(): void {
    // if(this.trip != undefined)
      // this.availableSpots = this.trip.maxPlaces;
    this.priceToShow = this.trip.price;
  }

  onPlusClick(){
    if(this.trip.availablePlaces > 0){
      this.trip.availablePlaces--;
      this.cartService.addItemToCart(this.trip);
    }
  }
  onMinusClick(){
    if(this.trip.availablePlaces < this.trip.maxPlaces){
      this.trip.availablePlaces++;
      this.cartService.removeItemFromCart(this.trip);
    }
  }
  getClassNames(){
    if(this.trip === this.tripsService.expensiveTrip){
      // return 'border border-4 border-success';
      return 'expensive';
    }
    else if (this.trip === this.tripsService.cheapTrip){
      // return 'border border-4 border-danger'
      return 'cheap'
    }
    else{
      return 'basic';
    }

  }
  onSelectChange(value: any){
    if(value === '$'){
      this.priceToShow = this.trip.price * this.plnToDollar;
    }
    else if(value === "€"){
      this.priceToShow = this.trip.price * this.plnToEuro;
    }
    else if(value === "PLN"){
      this.priceToShow = this.trip.price;
    }
  }

  // onDelete(trip: Trip): void{
  //   this.notifyDelete.emit(trip);
  //   // this.tripsService.deleteTrip(trip.id);
  //   console.log("Deleted", this.trip)
  // }

}

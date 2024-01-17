import { Injectable } from '@angular/core';
import { Trip } from '../trip';
import { HistoryService } from './history.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: {trip: Trip, quantity: number}[] = []; 
  tripsNotIncluded: Trip[] = [];
  
  constructor(private historyService: HistoryService) { }

  getQuantityOfTrip(trip: Trip){
    for( let item of this.cart){
      if (item.trip === trip){
        return item.quantity;
      }
    }
    return -1;
    // return this.cart.filter(i => i.trip === trip)
  }

  addItemToCart(item: Trip): void {
    // Already there
    for (const record of this.cart) {
      if (record.trip == item) {
        record.quantity += 1;
        return;
      }
    }
    // Add new record
    this.cart.push({trip: item, quantity: 1});
    this.cart.sort(
      (a, b) => a.trip.name.toLowerCase().localeCompare(b.trip.name.toLocaleLowerCase())
    );
  }

  removeItemFromCart(item: Trip): void {
    let toDelete = {trip: item, quantity: -1};
    for (const record of this.cart) {
      if (record.trip == item) {
        record.quantity -= 1;
        if (record.quantity > 0)
          return;
        toDelete = record;
        break;
      }
    }
    this.cart.splice(
      this.cart.indexOf(toDelete), 1
    );
  }

  getValueOfReservations(){
    let sum = 0;
    for (let item of this.cart){
      sum += item.quantity * item.trip.price;
    }
    return sum;
  }

  getNumOfReservations(){
    let sum = 0;
    for (let item of this.cart){
      sum += item.quantity;
    }
    return sum;
    // return Object.values(this.reservedTrips).reduce((acc, val) => acc + val, 0);
  }

  changeTripInclusion(trip: Trip, isIncluded: boolean){
    if(isIncluded){
      this.tripsNotIncluded = this.tripsNotIncluded.filter(t => t != trip);
    }
    else{
      if(!this.tripsNotIncluded.includes(trip)){
        this.tripsNotIncluded.push(trip);
      }
    }
    console.log(this.tripsNotIncluded)
  }

  getCartFinalValue(){
    let sum = 0;
    for (let item of this.cart){
      if(!this.tripsNotIncluded.includes(item.trip)){
        sum += item.quantity * item.trip.price;
      }
    }
    return sum;
  }

  buyTrips(){
    let itemsToAdd = [];
    for (let item of this.cart){
      if(!this.tripsNotIncluded.includes(item.trip)){
        
        // this.historyService.addToHistory(item);
        itemsToAdd.push(item);
        this.cart = this.cart.filter(t => t.trip != item.trip);
        item.trip.maxPlaces -= item.quantity;
      }
    }
    this.historyService.addItemsToHistory(itemsToAdd);
  }

}

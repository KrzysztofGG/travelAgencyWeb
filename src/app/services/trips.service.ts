import { Injectable, OnInit } from '@angular/core';
import {  Observable, firstValueFrom, lastValueFrom } from 'rxjs';
import { Trip, TripReview } from '../trip';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
import { io } from 'socket.io-client';

const TRIPS_KEY = 'trips'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TripsService{

  tripsUrl: string = "/assets/tripsDb.json";
  apiURL: string = "http://localhost:8080/api/trips/";

  tripsLoaded!: Promise<boolean>;

  public trips!: Trip[];
  public expensiveTrip!: Trip;
  public cheapTrip!: Trip;
  // freeId: number = 0;
  
  constructor(private http: HttpClient, private tokenService: TokenStorageService){
    
    this.refreshTrips();
    if(this.trips)
      this.updateSpecialTrips();
  }

  updateSpecialTrips(){
    if(this.trips.length > 0){

      this.expensiveTrip = this.trips.reduce((prev, curr) =>{
        return curr.price > prev.price ? curr : prev;
      })
    this.cheapTrip = this.trips.reduce((prev, curr) =>{
      return curr.price > prev.price ? prev : curr;
    })
  }
}

  async refreshTrips(){
    const headers = this.createAuthHeaders();

    this.http.get(this.apiURL, {headers}).subscribe(
      data => {
        window.sessionStorage.removeItem(TRIPS_KEY);
        window.sessionStorage.setItem(TRIPS_KEY, JSON.stringify(data));
      },
      err => {
        console.log("Trip load error: " + err.error.message)
      })
    this.trips = <Trip[]>JSON.parse(window.sessionStorage.getItem(TRIPS_KEY) || "").trips;
    this.tripsLoaded = Promise.resolve(true);
  }

  public createAuthHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': this.tokenService.getToken() || '',
    });
    return headers;
  }
  
  addTrip(trip: any): void{
    const headers = this.createAuthHeaders();
    this.http.post(this.apiURL, trip, { headers }).subscribe(data => {
      alert("New trip added");
      this.refreshTrips();
    })
    this.updateSpecialTrips();
  }

  updateTrip(trip: Trip): void {
    const headers = this.createAuthHeaders();
    this.http.put(this.apiURL + trip._id, trip, {headers}).subscribe(data =>{
      console.log(`Trip ${trip._id} updated successfuly`);
      this.refreshTrips();
    })
    this.updateSpecialTrips();
  }

  addReview(trip: Trip, newReview: TripReview){
    const headers = this.createAuthHeaders();
    trip.reviews.push(newReview);
    trip.ratings.push(newReview.rating);
    
    this.http.put(this.apiURL + trip._id, trip, {headers}).subscribe(data => {
      this.refreshTrips();
    })
  }

  removeReview(trip: Trip, review: TripReview){
    const headers = this.createAuthHeaders();
    trip.ratings.splice(trip.ratings.indexOf(review.rating), 1);
    trip.reviews.splice(trip.reviews.indexOf(review), 1);

    this.http.put(this.apiURL + trip._id, trip, {headers}).subscribe(data => {
      this.refreshTrips();
    })
  }

  deleteTrip(_id: string): void{
    
    const headers = this.createAuthHeaders();
    this.http.delete(this.apiURL + _id, {headers}).subscribe(data => {
      this.refreshTrips();
    })

    this.trips = this.trips.filter(t => t._id != _id);
    this.updateSpecialTrips();
  }


  getTripMeanRating(trip: Trip): number{
    if(trip.ratings.length === 0)
      return 0;

    return Math.ceil(trip.ratings.
      reduce((a, b) => a+b) / trip.ratings.length);
    // return this.trips.filter(t => t.id === trip.id)[0].
    //   reviews.map(r => r.rating).
    //   reduce((a, b) => a+b) / trip.reviews.length;
  }
  getCountries(): string[]{

    return this.trips.map(trip => trip.country).filter(function(item, pos, self){
      return self.indexOf(item) == pos;
    });
    
  }
}

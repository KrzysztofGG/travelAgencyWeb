import { Component, OnChanges, OnInit, Pipe, PipeTransform, SimpleChanges } from '@angular/core';
import { Trip } from '../trip';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SingleTripComponent } from '../single-trip/single-trip.component';
import { AsyncPipe, NgFor, NgIf, NgStyle } from '@angular/common';
import { TripAdderComponent } from '../trip-adder/trip-adder.component';
import { TripFilterComponent } from '../trip-filter/trip-filter.component';
import { SummaryValueComponent } from '../summary-value/summary-value.component';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { TripsService } from '../services/trips.service';
import { CartService } from '../services/cart.service';

// @Pipe({
//   name: 'filterTrips',
//   standalone: true
// })
// class FilterTripsPipe implements PipeTransform{

//   constructor(private tripsService: TripsService){}

//   transform(trips: Trip[], filters: any) {
//     const tripsPriced = trips.filter(trip =>{
//       return trip.price >= filters.minPrice && trip.price <= filters.maxPrice;
//     })
//     const tripsDated = tripsPriced.filter(trip =>{
//       return trip.dateStart >= filters.dateStart && trip.dateEnd <= trip.dateEnd;
//     })
//     const tripsRated = tripsDated.filter(trip => {
//       return filters.rating.indexOf(this.tripsService.getTripMeanRating(trip)) !== -1;
//     })
    
//     return tripsRated.filter(trip =>{
//       return filters.countries.indexOf(trip.country) !== -1;
//     })
//   }
// }

@Component({
  selector: 'app-trips-list',
  standalone: true,
  imports: [SingleTripComponent, TripAdderComponent, TripFilterComponent, 
    SummaryValueComponent, ShoppingCartComponent, NavigationComponent,
    NgFor, NgStyle, NgIf, AsyncPipe ],
  providers: [  ],
  templateUrl: './trips-list.component.html',
  styleUrl: './trips-list.component.css'
})
export class TripsListComponent implements OnInit{

  tripsToShow: Trip[] = [];
  trips: Trip[] = [];
  constructor(public tripsService: TripsService, public cartService: CartService){}

  filters = {
    minPrice: 0,
    maxPrice: 10000,
    dateStart: (new Date("01/01/1975")).toLocaleDateString("en-US"),
    dateEnd: (new Date("01/01/2030")).toLocaleDateString("en-US"),
    rating: [0, 1, 2, 3, 4, 5],
    countries: ['']
  }

  ngOnInit(): void {
    this.setupFilters();
    this.createPagination();
    this.tripsService.updateSpecialTrips();
  }

  currentPage = 0;
  pageSize = 5;
  numOfPages = 0;

  changePageSize(event: any){
    this.pageSize = event.value;
    this.currentPage = 0;
    this.createPagination();
  }

  changePage(value: number){
    if(value >=0 && value < this.numOfPages){
      this.currentPage = value;
      this.createPagination();
    }
  }

  createPagination(){
    let filteredTrips = this.filterTrips()
    this.tripsToShow = [];
    for(let i= (this.currentPage * this.pageSize); i < Math.min(filteredTrips.length, (this.currentPage + 1) * this.pageSize); ++i){
      this.tripsToShow.push(filteredTrips[i]);
    }

    this.numOfPages = Math.ceil(filteredTrips.length / this.pageSize);
  }

  setupFilters(){

    this.filters.maxPrice = this.tripsService.expensiveTrip.price;
    this.filters.minPrice = this.tripsService.cheapTrip.price;
    

    this.filters.dateStart = new Date(this.tripsService.trips.reduce((prev, curr) =>{
      return curr.dateStart > prev.dateStart ? prev : curr;
    }).dateStart).toLocaleDateString("en-US");
    // this.filters.dateStart = (new Date("01/01/1975")).toLocaleDateString("en-US");
    this.filters.dateEnd = (new Date("05/05/2030")).toLocaleDateString("en-US");

    // this.filters.dateEnd = new Date(this.tripsService.trips.reduce((prev, curr) =>{
    //   return curr.dateEnd > prev.dateEnd ? curr : prev;
    // }).dateEnd).toLocaleDateString("en-US");
    
    this.filters.rating = [0, 1, 2, 3, 4, 5];

    this.filters.countries = this.tripsService.getCountries();
  }

  filterTrips() {
    const tripsPriced = this.tripsService.trips.filter(trip =>{
      return trip.price >= this.filters.minPrice && trip.price <= this.filters.maxPrice;
    })
    
    const tripsDated = tripsPriced.filter(trip => {
      const [day1, month1, year1] = trip.dateStart.toString().split('/');
      const yourObjectDateStart = new Date(`${year1}-${month1}-${day1}`);
      const [day, month, year] = trip.dateStart.toString().split('/');
      const yourObjectDateEnd = new Date(`${year}-${month}-${day}`);

      return yourObjectDateStart >= new Date(this.filters.dateStart) && yourObjectDateEnd <= new Date(this.filters.dateEnd);
      // return new Date(trip.dateStart)>= new Date(this.filters.dateStart) && 
      // new Date(trip.dateEnd) <= new Date(this.filters.dateEnd);
    })
    
    const tripsRated = tripsDated.filter(trip => {
      return this.filters.rating.indexOf(this.tripsService.getTripMeanRating(trip)) !== -1;
    })
    
    return tripsRated.filter(trip =>{
      return this.filters.countries.indexOf(trip.country) !== -1;
    })
  }
  
  handleFilters(event: {id: string, value: string}){
    if (event.id === 'minPrice'){
      let newMinPrice = parseInt(event.value);
      this.filters["minPrice"] = isNaN(newMinPrice) ? 0 : newMinPrice
    }
    else if (event.id === 'maxPrice'){
      let newMaxPrice = parseInt(event.value);
      this.filters["maxPrice"] = isNaN(newMaxPrice) ? this.tripsService.expensiveTrip.price : newMaxPrice;
    }
    else if (event.id === 'dateStart'){
      let newDateStart = new Date(event.value).toLocaleDateString("en-US");

      this.filters["dateStart"] = newDateStart.toString() === "Invalid Date" ? this.tripsService.trips.reduce((prev, curr) =>{
        return curr.dateStart > prev.dateStart ? prev : curr;
      }).dateStart.toLocaleDateString("en-US") : newDateStart;

    }
    else if (event.id === 'dateEnd'){
      let newDateEnd = new Date(event.value).toLocaleDateString("en-US");
      this.filters["dateEnd"] = newDateEnd.toString() === "Invalid Date" ? this.tripsService.trips.reduce((prev, curr) =>{
        return curr.dateEnd > prev.dateEnd ? curr : prev;
      }).dateEnd.toLocaleDateString("en-US") : newDateEnd;
    }
    // else if (event.id === 'rating'){
    //   if (this.filters["rating"].length > 5)
    //     this.filters["rating"] = [];
      
    //   const ratingValue = parseInt(event.value);

    //   if(this.filters["rating"].indexOf(ratingValue) === -1)
    //     this.filters["rating"].push(ratingValue);
    // }
    // else if (event.id === 'countries'){
    //   if (this.filters["countries"].l)
    // }
    else if (event.id === 'rating'){
      this.filters["rating"] = [];
      const ratingValue = parseInt(event.value);
      this.filters["rating"].push(ratingValue);
    }
    else if (event.id === 'countries'){
      this.filters["countries"].length = 0;
      this.filters["countries"].push(event.value);
    }
    else if (event.id === 'clear'){
      this.setupFilters(); 
    }
    
    this.createPagination();
    
  }

  onDelete(event: Trip){
    this.tripsService.deleteTrip(event._id);
    this.createPagination();
  }
}

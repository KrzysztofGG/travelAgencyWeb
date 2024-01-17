import { NgClass, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TripsService } from '../services/trips.service';
import { Trip } from '../trip';
import { write } from 'fs';

@Component({
  selector: 'app-trip-rating',
  standalone: true,
  imports: [NgClass, NgFor],
  templateUrl: './trip-rating.component.html',
  styleUrl: './trip-rating.component.css'
})
export class TripRatingComponent implements OnInit{
  // stars = document.getElementsByClassName("fa-star");
  stars: number[] = [1, 2, 3, 4, 5];
  // selectedValue!: number;
  selectedValue: number = 0;


  @Input() trip!: Trip;
  @Input() writeOnly: boolean = false;
  @Input() readOnly: boolean = false;
  @Input() ratingToShow: number = 0;

  @Output() ratingChosen = new EventEmitter();

  constructor(private tripsService: TripsService){}

  ngOnInit(): void {
    if(this.writeOnly){
      this.selectedValue = 0;
    }
    else if(this.readOnly){
      // if(this.trip.ratings != undefined)
        this.selectedValue = this.tripsService.getTripMeanRating(this.trip);
      // else
      //   this.selectedValue = 1;
    }
    else{
      this.selectedValue = this.ratingToShow;
    }
  }


  countStar(star: number){
    if(this.writeOnly){
      this.selectedValue = star;
      this.ratingChosen.emit(star);
    }
    // this.trip.ratings.push(star);
    // this.selectedValue = this.trip.ratings.reduce((a, b) => a+b) / this.trip.ratings.length;

  }

  // addClass(star: number){
  //   let ab = "";
  //   for(let i = 0; i < star; ++i){
  //     ab = "starId" + i;
  //     document.getElementById(ab)?.classList.add("selected");
  //   }
  // }
  // removeClass(star: number){
  //   let ab = "";
  //   for (let i = star-1; i>= this.selectedValue; i--){
  //     ab = "starId" + i;
  //     document.getElementById(ab)?.classList.remove("selected");
  //   }
  // }


  // rating(stars: any): void{
  //   const starClassActive = "fa fa-star checked";
  //   const starClassInactive = "fa fa-star";
  //   const starsLength = stars.length;
  //   let i;
  //   stars.map((star: any) =>{
  //     star.onclick = () => {
  //       i = stars.indexOf(star);

  //       if(star.className === starClassInactive){
  //         for(i; i>= 0; --i) stars[i].className = starClassActive;
  //       }
  //       else{
  //         for(i; i<starsLength; ++i) stars[i].className = starClassInactive;
  //       }
  //     };
  //   });
  // }
}

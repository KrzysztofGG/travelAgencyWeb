import { Component, Input, ViewChild } from '@angular/core';
import { Trip, TripReview } from '../trip';
import { TripsService } from '../services/trips.service';
import { FormsModule, NgForm } from '@angular/forms';
import { TripRatingComponent } from '../trip-rating/trip-rating.component';
import { NgFor, NgIf } from '@angular/common';
import { HistoryService } from '../services/history.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [FormsModule, TripRatingComponent, NgIf, NgFor],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {

  @Input() trip!: Trip;
  @ViewChild('reviewForm') form!: NgForm;
  rating: number = 0;
  reviewFailure = false;
  errMessage = '';

  constructor(private tripsService: TripsService, private historyService: HistoryService, public authService: AuthService){}

  onSubmit(): void {
    if (!this.form.valid) {
      this.form.controls['nick'].markAsTouched();
      this.form.controls['description'].markAsTouched();
      return;
    }
    
    let newReview: TripReview = {
      author: this.form.value['nick'],
      rating: this.rating,
      comment: this.form.value['description'],
      // date: this.form.value['date']
    }
    let date = this.form.value['date'];
    if (date != null && date != "")
      newReview.date = date;

    if(this.authService.roles.includes('ROLE_ADMIN')){
      this.reviewFailure = true;
      this.errMessage = "Admin can't comment";
      return;
    }
    console.log(this.historyService.purchaseHistory);
    if(this.historyService.purchaseHistory.map(el => el.trip._id).includes(this.trip._id)){
      this.tripsService.addReview(this.trip, newReview);
      this.reviewFailure = false;
      console.log("Review added" + newReview);
    }
    else{
      this.errMessage = "Can't review unbought trip";
      this.reviewFailure = true;
    }

    // this.form.reset();
  }

  updateRating(newRating: number): void {
    this.rating = newRating;
  }

  onDelete(review: any){
    this.tripsService.removeReview(this.trip, review);
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Trip } from '../../trip';
import { TripsService } from '../../services/trips.service';

@Component({
  selector: 'app-single-trip-mod',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './single-trip-mod.component.html',
  styleUrl: './single-trip-mod.component.css'
})
export class SingleTripModComponent implements OnInit{

  @Input() trip!: Trip;
  tripForm!: FormGroup;

  constructor(private tripsService: TripsService){}

  ngOnInit(): void {
    this.tripForm = new FormGroup({
      tripName: new FormControl(this.trip.name, [Validators.required]),
      country: new FormControl(this.trip.country, [Validators.required]),
      dateStart: new FormControl(this.trip.dateStart, [Validators.required]),
      dateEnd: new FormControl(this.trip.dateEnd, [Validators.required]),
      price: new FormControl(this.trip.price, [Validators.required]),
      maxPlaces: new FormControl(this.trip.maxPlaces, [Validators.required]),
      photoLink1: new FormControl(this.trip.imageSources[0], [Validators.required]),
      photoLink2: new FormControl(this.trip.imageSources[1], [Validators.required]),
      photoLink3: new FormControl(this.trip.imageSources[2], [Validators.required]),
      description: new FormControl(this.trip.description, [Validators.required]),
    });
  }

  onSubmit(){
    if(!this.tripForm.valid){
      console.log("form Invalid");
      return;
    }
    this.trip.name = this.tripForm.value.tripName;
    this.trip.country = this.tripForm.value.country;
    this.trip.dateStart = this.tripForm.value.dateStart;
    this.trip.dateEnd = this.tripForm.value.dateEnd;
    this.trip.price = this.tripForm.value.price;
    this.trip.maxPlaces = this.tripForm.value.maxPlaces;
    this.trip.availablePlaces = this.tripForm.value.maxPlaces;
    this.trip.imageSources = [
        this.tripForm.value.photoLink1,
        this.tripForm.value.photoLink2,
        this.tripForm.value.photoLink3,
    ]
    this.trip.description = this.tripForm.value.description;
    
    this.tripsService.updateTrip(this.trip);
    console.log("Trip updated");
  }

  onDelete(){
    this.tripsService.deleteTrip(this.trip._id);
  }


}

import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Trip } from '../trip';
import { TripsService } from '../services/trips.service';

@Component({
  selector: 'app-trip-adder',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './trip-adder.component.html',
  styleUrl: './trip-adder.component.css'
})
export class TripAdderComponent implements OnInit{
  formData!: FormGroup;

  constructor(private tripsService: TripsService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formData = this.fb.group({
      name: ['', Validators.required],
      country: ['', Validators.required],
      dateStart: ['', Validators.required],
      dateEnd: ['', Validators.required],
      price: ['', Validators.required],
      maxPlaces: ['', Validators.required],
      description: ['', Validators.required],
      photoUrl1: ['', Validators.required],
      photoUrl2: ['', Validators.required],
      photoUrl3: ['', Validators.required],
    });
  }

  // dataForm = new FormGroup({
  //   name: new FormControl('', Validators.required),
  //   country: new FormControl('', Validators.required),
  //   startDate: new FormControl('', Validators.required),
  //   endDate: new FormControl('', Validators.required)
  // })

  onFormSubmit(){
    if(this.formData.valid){
      const data = {
        // _id: "-1",
        name: this.formData.value.name,
        country: this.formData.value.country,
        dateStart: this.formData.value.dateStart,
        dateEnd: this.formData.value.dateEnd,
        price: this.formData.value.price,
        maxPlaces: this.formData.value.maxPlaces,
        availablePlaces: this.formData.value.maxPlaces,
        description: this.formData.value.description,
        imageSources: [
          // "https://zenfutura.pl/wp-content/uploads/2023/04/Egipt-Piramidy-Faraon-Kair.jpg",
          // "https://zenfutura.pl/wp-content/uploads/2023/04/Egipt-Piramidy-Faraon-Kair.jpg",
          // "https://zenfutura.pl/wp-content/uploads/2023/04/Egipt-Piramidy-Faraon-Kair.jpg"
          this.formData.value.photoUrl1,
          this.formData.value.photoUrl2,
          this.formData.value.photoUrl3,
        ],
        ratings: [],
        reviews: []
      }
      this.tripsService.addTrip(data)
      this.formData.reset();
    }
    else{
      console.log(this.formData);
    }
  }

}

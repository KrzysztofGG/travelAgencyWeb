import { Component } from '@angular/core';
import { TripAdderComponent } from '../trip-adder/trip-adder.component';
import { NgFor } from '@angular/common';
import { TripsService } from '../services/trips.service';
import { SingleTripModComponent } from './single-trip-mod/single-trip-mod.component';

@Component({
  selector: 'app-mod-page',
  standalone: true,
  imports: [TripAdderComponent, NgFor, SingleTripModComponent],
  templateUrl: './mod-page.component.html',
  styleUrl: './mod-page.component.css'
})
export class ModPageComponent {

  constructor(public tripsService: TripsService){}
}

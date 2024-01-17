import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';




@Component({
  selector: 'app-trip-filter',
  standalone: true,
  imports: [NgFor],
  templateUrl: './trip-filter.component.html',
  styleUrl: './trip-filter.component.css',

})
export class TripFilterComponent{

  @Input() countries!: string[];
  @Output() notifyFilter: EventEmitter<any> = new EventEmitter<any>();
  minPrice: number = 0;

  onChange(target: any){
    this.notifyFilter.emit({id: target.id, value: target.value});
  }
}



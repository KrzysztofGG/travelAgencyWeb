import { Component } from '@angular/core';
import { HistoryService } from '../services/history.service';
import { NgFor, NgIf, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [NgIf, NgFor, UpperCasePipe],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {


  showArchival: boolean = false;
  showOngoing: boolean = true;
  showFuture: boolean = true;

  constructor(public historyService: HistoryService){}

  updateFilters(state: number, event: any): void {
    if (state == -1)
      this.showArchival = event.target.checked;
    if (state == 0)
      this.showOngoing = event.target.checked;
    if (state == 1)
      this.showFuture = event.target.checked;
  }

  shouldShow(state: number): boolean {
    if (state == -1)
      return this.showArchival;
    if (state == 0)
    return this.showOngoing;
    if (state == 1)
      return this.showFuture;
    return false;
  }


}

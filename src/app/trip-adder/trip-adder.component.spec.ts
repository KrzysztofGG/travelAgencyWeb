import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripAdderComponent } from './trip-adder.component';

describe('TripAdderComponent', () => {
  let component: TripAdderComponent;
  let fixture: ComponentFixture<TripAdderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripAdderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TripAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

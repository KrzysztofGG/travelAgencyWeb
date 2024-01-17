import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservedTripComponent } from './reserved-trip.component';

describe('ReservedTripComponent', () => {
  let component: ReservedTripComponent;
  let fixture: ComponentFixture<ReservedTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservedTripComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservedTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

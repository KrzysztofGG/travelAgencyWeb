import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTripModComponent } from './single-trip-mod.component';

describe('SingleTripModComponent', () => {
  let component: SingleTripModComponent;
  let fixture: ComponentFixture<SingleTripModComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleTripModComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleTripModComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryValueComponent } from './summary-value.component';

describe('SummaryValueComponent', () => {
  let component: SummaryValueComponent;
  let fixture: ComponentFixture<SummaryValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryValueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SummaryValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

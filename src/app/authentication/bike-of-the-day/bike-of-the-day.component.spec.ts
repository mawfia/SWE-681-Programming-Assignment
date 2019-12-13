import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeOfTheDayComponent } from './bike-of-the-day.component';

describe('BikeOfTheDayComponent', () => {
  let component: BikeOfTheDayComponent;
  let fixture: ComponentFixture<BikeOfTheDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BikeOfTheDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BikeOfTheDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

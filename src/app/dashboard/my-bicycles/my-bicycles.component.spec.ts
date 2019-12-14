import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBicyclesComponent } from './my-bicycles.component';

describe('MyBicyclesComponent', () => {
  let component: MyBicyclesComponent;
  let fixture: ComponentFixture<MyBicyclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyBicyclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBicyclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

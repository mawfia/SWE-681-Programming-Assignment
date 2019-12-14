import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAcquisitionBicyclesListComponent } from './my-acquisition-bicycles-list.component';

describe('MyAcquisitionBicyclesListComponent', () => {
  let component: MyAcquisitionBicyclesListComponent;
  let fixture: ComponentFixture<MyAcquisitionBicyclesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAcquisitionBicyclesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAcquisitionBicyclesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

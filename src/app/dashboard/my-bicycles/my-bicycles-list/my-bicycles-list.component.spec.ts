import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBicyclesListComponent } from './my-bicycles-list.component';

describe('MyBicyclesListComponent', () => {
  let component: MyBicyclesListComponent;
  let fixture: ComponentFixture<MyBicyclesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyBicyclesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBicyclesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

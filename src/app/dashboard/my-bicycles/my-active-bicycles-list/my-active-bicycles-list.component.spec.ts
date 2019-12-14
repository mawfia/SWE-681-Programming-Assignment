import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyActiveBicyclesListComponentComponent } from './my-active-bicycles-list-component.component';

describe('MyActiveBicyclesListComponentComponent', () => {
  let component: MyActiveBicyclesListComponentComponent;
  let fixture: ComponentFixture<MyActiveBicyclesListComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyActiveBicyclesListComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyActiveBicyclesListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

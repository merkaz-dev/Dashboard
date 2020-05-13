import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyClicksComponent } from './monthly-clicks.component';

describe('MonthlyClicksComponent', () => {
  let component: MonthlyClicksComponent;
  let fixture: ComponentFixture<MonthlyClicksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyClicksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyClicksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

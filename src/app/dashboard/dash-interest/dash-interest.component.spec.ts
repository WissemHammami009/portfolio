import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashInterestComponent } from './dash-interest.component';

describe('DashInterestComponent', () => {
  let component: DashInterestComponent;
  let fixture: ComponentFixture<DashInterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashInterestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

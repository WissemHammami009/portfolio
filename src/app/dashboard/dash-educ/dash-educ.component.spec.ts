import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashEducComponent } from './dash-educ.component';

describe('DashEducComponent', () => {
  let component: DashEducComponent;
  let fixture: ComponentFixture<DashEducComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashEducComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashEducComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

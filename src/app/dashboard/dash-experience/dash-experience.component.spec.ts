import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashExperienceComponent } from './dash-experience.component';

describe('DashExperienceComponent', () => {
  let component: DashExperienceComponent;
  let fixture: ComponentFixture<DashExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashExperienceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

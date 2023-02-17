import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashSkillsComponent } from './dash-skills.component';

describe('DashSkillsComponent', () => {
  let component: DashSkillsComponent;
  let fixture: ComponentFixture<DashSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashSkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

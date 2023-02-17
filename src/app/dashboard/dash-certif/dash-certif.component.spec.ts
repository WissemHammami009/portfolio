import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashCertifComponent } from './dash-certif.component';

describe('DashCertifComponent', () => {
  let component: DashCertifComponent;
  let fixture: ComponentFixture<DashCertifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashCertifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashCertifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/*
    Author: Wissem Hammami
    Github: wissemhammami009
    Website: https://wissem-hammami.web.app || www.wissem-hammami.info
    Email: hammamiwissem21@gmail.com
*/
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioComponent } from './portfolio.component';

describe('PortfolioComponent', () => {
  let component: PortfolioComponent;
  let fixture: ComponentFixture<PortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

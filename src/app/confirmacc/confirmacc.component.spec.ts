import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmaccComponent } from './confirmacc.component';

describe('ConfirmaccComponent', () => {
  let component: ConfirmaccComponent;
  let fixture: ComponentFixture<ConfirmaccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmaccComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmaccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompMessagesComponent } from './comp-messages.component';

describe('CompMessagesComponent', () => {
  let component: CompMessagesComponent;
  let fixture: ComponentFixture<CompMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompMessagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

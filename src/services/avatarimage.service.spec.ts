import { TestBed } from '@angular/core/testing';

import { AvatarimageService } from './avatarimage.service';

describe('AvatarimageService', () => {
  let service: AvatarimageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvatarimageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

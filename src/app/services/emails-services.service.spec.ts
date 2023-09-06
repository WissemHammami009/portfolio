import { TestBed } from '@angular/core/testing';

import { EmailsServicesService } from './emails-services.service';

describe('EmailsServicesService', () => {
  let service: EmailsServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailsServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

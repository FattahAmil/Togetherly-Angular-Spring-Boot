import { TestBed } from '@angular/core/testing';

import { MessagServiceService } from './messag-service.service';

describe('MessagServiceService', () => {
  let service: MessagServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

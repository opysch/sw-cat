import { TestBed, inject } from '@angular/core/testing';

import { HeadItemsService } from './head-items.service';

describe('HeadItemsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeadItemsService]
    });
  });

  it('should be created', inject([HeadItemsService], (service: HeadItemsService) => {
    expect(service).toBeTruthy();
  }));
});

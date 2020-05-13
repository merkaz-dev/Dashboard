import { TestBed } from '@angular/core/testing';

import { HttpService } from './basic-graphs/basic-graphs-http.service';

describe('HttpServiceService', () => {
  let service: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

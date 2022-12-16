import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { BidService } from './bid.service';
import { ProductService } from './product.service';

describe('BidService', () => {
  let service: BidService;
  let http: HttpClient
  let httpController: HttpTestingController
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(BidService);
    http = TestBed.inject(HttpClient)
    httpController = TestBed.inject(HttpTestingController)
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('GET bids success', () => {
    let testData = {
      _id: "639a00dbcd8cb6575b206cc8",
      buyerFName: "Karma",
      buyerLName: "Smith",
      buyerAdd: "111 Something rd",
      buyerCity: "Somewhere",
      buyerState: "State",
      buyerPhone: "1111111111",
      buyerPin: "0000",
      buyerEmail: "karma@bids.com",
      prodId: "6399fc39cd8cb6575b206cc4",
      bidAmount: 130.29
  }
    service.getBids('6399fc39cd8cb6575b206cc4').toPromise().then((data) =>  {
  
      expect(data).toEqual(testData)

    })
    const req = httpController.expectOne('http://localhost:3000/e-auction/api/v1/seller/show-bids/6399fc39cd8cb6575b206cc4')

    expect(req.request.method).toEqual('GET')

    req.flush(testData)
  });

  it('GET bids fail', () => {

    service.getBids('6399fc39cd8cb6575b206cc3').toPromise().then((data) =>  {
  
      expect(data).toBeNull()

    })
    const req = httpController.expectOne('http://localhost:3000/e-auction/api/v1/seller/show-bids/6399fc39cd8cb6575b206cc3')

    expect(req.request.method).toEqual('GET')
  });
});

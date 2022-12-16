import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { ProductService } from './product.service';
import { HttpClient } from '@angular/common/http';

describe('ProductService', () => {
  let service: ProductService;
  let http: HttpClient
  let httpController: HttpTestingController
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    http = TestBed.inject(HttpClient)
    httpController = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('GET products success', () => {
    let testData = {
      prodName: "Testing frontend",
      sDesc: "Should have a start price of $72.99",
      dDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Phasellus egestas tellus rutrum tellus pellentesque eu. Ullamcorper velit sed ullamcorper morbi. Dapibus ultrices in iaculis nunc sed augue lacus. Odio pellentesque diam volutpat commodo. Eleifend mi in nulla posuere sollicitudin aliquam ultrices. Nulla facilisi morbi tempus iaculis urna id. Suspendisse faucibus interdum posuere lorem ipsum. Convallis a cras semper auctor neque vitae tempus quam pellentesque. Pellentesque habitant morbi tristique senectus et netus. Sed enim ut sem viverra. Urna duis convallis convallis tellus id interdum velit. Etiam dignissim diam quis enim lobortis scelerisque. Augue ut lectus arcu bibendum at varius vel. Eget aliquet nibh praesent tristique magna sit amet purus. Nibh cras pulvinar mattis nunc. Pharetra pharetra massa massa ultricies mi quis hendrerit dolor. Purus ut faucibus pulvinar elementum integer enim neque.",
      cat: "Painting",
      startPrice: 72.99,
      endDate: 1672006706000,
      sellerFName: "Jasmine",
      sellerLName: "Smith",
      sellerAdd: "123 Test Ln",
      sellerCity: "Concord",
      sellerState: "NH",
      sellerPhone: "1234567890",
      sellerPin: "0000",
      sellerEmail: "Jasmine@karma.com",
      _id: "6399fc39cd8cb6575b206cc4"
  }
    service.getProductsWithEmail('Jasmine@karma.com').toPromise().then((data) =>  {
  
      expect(data).toEqual(testData)

    })
    const req = httpController.expectOne('http://localhost:3000/e-auction/api/v1/seller/products/Jasmine@karma.com')

    expect(req.request.method).toEqual('GET')

    req.flush(testData)
  });

  it('GET products fail', () => {

    service.getProductsWithEmail('Jasmine@karmaa.com').toPromise().then((data) =>  {
  
      expect(data).toBeNull()

    })
    const req = httpController.expectOne('http://localhost:3000/e-auction/api/v1/seller/products/Jasmine@karmaa.com')

    expect(req.request.method).toEqual('GET')
  });
});

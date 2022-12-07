import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bid } from '../models/bid'
@Injectable({
  providedIn: 'root'
})
export class BidService {

  constructor(private http:HttpClient) { }

  getBids(prodId:string):Observable<any> {
    return this.http.request('GET', 'http://localhost:3000/e-auction/api/v1/seller/show-bids/' + prodId, 
    {
      responseType:'json',
    })
  }
}

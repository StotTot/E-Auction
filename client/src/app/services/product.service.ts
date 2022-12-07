import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getProductsWithEmail(email:string):Observable<any> {
    return this.http.request('GET', 'http://localhost:3000/e-auction/api/v1/seller/products/' + email, 
    {
      responseType:'json',
    })
  }


}

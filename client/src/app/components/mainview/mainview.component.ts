import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Bid } from 'src/app/models/bid';
import { Product } from 'src/app/models/product';
import { BidService } from 'src/app/services/bid.service';
import { ProductService } from 'src/app/services/product.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
} 

@Component({
  selector: 'app-mainview',
  templateUrl: './mainview.component.html',
  styleUrls: ['./mainview.component.css']
})
export class MainviewComponent implements OnInit {

  constructor(private productService:ProductService, private bidService:BidService) { }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
    this.getProducts() 
  }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();

  currProduct:Product
  inputEmail:string = 'ng@test.com'
  products:Product[] = []
  bids:Bid[] = []
  
  update(e){
    this.currProduct = e
    console.log(JSON.stringify(this.currProduct));
    this.getBids()
  }

  getProducts() {
    console.log(this.inputEmail);
    
    this.productService.getProductsWithEmail(this.inputEmail).subscribe((data) => {
      this.products = data.docs
      console.log(JSON.stringify(this.products));      
    })
  }

  getBids() {
    console.log(this.currProduct)
    this.bidService.getBids(this.currProduct._id).subscribe((data) => {
      this.bids = data.docs
      console.log(JSON.stringify(this.bids));      
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Bid } from 'src/app/models/bid';
import { Product } from 'src/app/models/product';
import { BidService } from 'src/app/services/bid.service';
import { ProductService } from 'src/app/services/product.service';
import {MatSnackBar} from '@angular/material/snack-bar';

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

  constructor(private productService:ProductService, private bidService:BidService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();

  currProduct:Product = {
    prodName: "Please select a product",
    sDesc: "",
    dDesc: "If no products appear in the dropdown menu then please enter your email into the box at the top and either hit the enter key or the button next to it.",
    cat: "",
    startPrice: 0,
    endDate: 1670533155
  }
  inputEmail:string = ''
  products:Product[] = []
  bids:Bid[] = []

  displayedColumns: string[] = ['amount', 'name', 'email', 'mobile'];
  dataSource:any
  
  
  bidSnackBar() {
    this._snackBar.open("Received bids for product: " + this.currProduct._id, null, {duration: 1000});
  }

  productSnackBar() {
    this._snackBar.open("Received products for user: " + this.inputEmail, null, {duration: 1000})
  }


  update(e){
    this.currProduct = JSON.parse(JSON.stringify(e))
    console.log(JSON.stringify(this.currProduct));
    this.getBids()
    this.bidSnackBar()
  }

  getProducts() {
    console.log(this.inputEmail);
    
    this.productService.getProductsWithEmail(this.inputEmail).subscribe((data) => {
      this.products = data.docs
      console.log(JSON.stringify(this.products));      
    })
    this.productSnackBar()
  }

  getBids() {
    console.log(this.currProduct)
    console.log(this.currProduct.prodName);
    
    this.bidService.getBids(this.currProduct._id).subscribe((data) => {
      this.bids = data.docs
      this.dataSource = this.bids
      this.bids.sort((a, b) => (a.bidAmount > b.bidAmount ? -1 : 1))
      console.log(JSON.stringify(this.bids));      
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Bid } from 'src/app/models/bid';
import { Product } from 'src/app/models/product';
import { BidService } from 'src/app/services/bid.service';
import { ProductService } from 'src/app/services/product.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { EpochPipe } from 'src/app/pipes/epoch.pipe';

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
    // nothing needs to be done on init
  }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();
  // product on initial page load
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

  // populate drop-down menu
  update(e) {
    this.currProduct = JSON.parse(JSON.stringify(e))
    this.getBids()
    this.bidSnackBar()
  }
  // get products
  getProducts() {
    this.productService.getProductsWithEmail(this.inputEmail).subscribe((data) => {      
      this.products = data.docs     
    })
    this.productSnackBar()
  }
  // get bids then sort bids by price
  getBids() {   
    this.bidService.getBids(this.currProduct._id).subscribe((data) => {
      this.bids = data.docs
      this.bids.sort((a, b) => (a.bidAmount > b.bidAmount ? -1 : 1))
      this.dataSource = this.bids
    })
  }

}

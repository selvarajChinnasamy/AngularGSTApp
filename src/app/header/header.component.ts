import { Component, OnInit } from '@angular/core';

// store
import { AddProduct } from '../actions/user.actions';
import { Store } from '@ngxs/store';
import { Product } from '../models/product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  addProduct: boolean;
  constructor(private store: Store, private productService: ProductService) {}

  ngOnInit() {}
  addProductPopup(open) {
    this.addProduct = open;
  }
  storeData(data): void {
    this.productService.addProduct(data).subscribe( res => {
      if (res['success']) {
        data['_id'] = res['id'];
        data['date'] = this.productService.dateFromObjectId(data['_id']);
        this.store.dispatch(new AddProduct(data));
      }
    }, (err) => this.errorHandler(err));
    this.addProductPopup(false);
  }
  updateProductState($event): void {
    $event['success'] ? this.storeData($event['data']) : this.addProductPopup(false);
  }
  errorHandler(err) {
    console.log(err);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

import { Store } from '@ngxs/store';
import { Product } from './models/product.model';
import { AddProduct } from './actions/user.actions';
import { ProductService } from './product.service';

@Injectable()
export class AppLoadService {
  constructor(private store: Store, private productService: ProductService) { }
  initializeApp(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.productService.getAllProducts().subscribe(res => {
        if (res['success']) {
          res['data'].forEach((doc) => {
            doc['date'] = this.productService.dateFromObjectId(doc._id);
            this.store.dispatch(new AddProduct(doc));
          });
          return resolve();
        }
        return reject();
      }, (err) => this.errorHandler(err));
    });
  }
  errorHandler(err) {
    console.log(err);
  }
}

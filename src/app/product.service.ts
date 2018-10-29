import { Injectable } from '@angular/core';
import { Product } from './models/product.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) {
    localStorage.clear();
  }
  dateFromObjectId(objectId) {
    return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
  }
  getAllProducts() {
    return this.httpClient.get(`${environment.API_ENDPOINT}/product`);
  }
  addProduct(product: Product) {
    return this.httpClient.post(`${environment.API_ENDPOINT}/product`, product);
  }
  mathCalc(expr) {
    const body = {
      expr: expr,
      precision: 14
    };
    return this.httpClient.post(`${environment.MATH_OPP}/`, body);
  }
}

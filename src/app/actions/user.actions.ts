import { Product } from './../models/product.model';

export class AddProduct {
  static readonly type = '[PRODUCT] Add';

  constructor(public payload: Product) {}

}

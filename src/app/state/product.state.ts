import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Product } from '../models/product.model';
import { AddProduct } from './../actions/user.actions';

export class ProductStateModel {
  products: Array<Product>;
}

@State<ProductStateModel>({
  name: 'products',
  defaults: {
    products: []
  }
})

export class ProductState {

  @Selector()
  static getProduct(state: ProductStateModel) {
    return state.products;
  }

  @Action(AddProduct)
  add({ getState, setState }: StateContext<ProductStateModel>, { payload }: AddProduct) {
    const preState: Array<Product> = Object.assign([], getState().products);
    preState.push(payload);
    setState({
      products: preState
    });
  }
}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {
  @Output() product = new EventEmitter();
  productForm: FormGroup;
  formSubmitted: boolean;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createProductForms();
  }
  createProductForms() {
    this.productForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      price: [null, [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]],
      gstPercentage: [null, [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]],
    });
  }
  onSubmit() {
    this.formSubmitted = true;
    if (this.productForm.invalid) { return; }
    const data = this.productCreate(this.productForm.value);
    this.product.emit({ success: true, data: data });
  }
  productCreate = function (data) {
    data['_id'] = data._id;
    data['name'] = data.name;
    data['price'] = Number(data.price);
    data['gstPercentage'] = Number(data.gstPercentage);
    return data;
  };
  close(): void {
    this.product.emit({ success: false });
  }
}

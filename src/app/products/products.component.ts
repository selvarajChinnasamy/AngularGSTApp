import { Component } from '@angular/core';
import { ProductState } from '../state/product.state';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { Product } from '../models/product.model';
import { ProductService } from '../product.service';

// chart
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Array<Product>;
  chart: Chart;
  chartData: Array<any>;
  @Select(ProductState.getProduct) products$: Observable<Product>;
  constructor(private productService: ProductService) {
    this.products$.subscribe(product => {
      this.products = Object.assign([], product);
      this.getPriceWithGst();
      if (!this.products.length) { return; }
      this.chartData = this.groupBy(this.products, 'gstPercentage');
      this.initChart();
    });
  }
  getPriceWithGst() {
    const expr = this.products.map(item => `(${item.gstPercentage}/100)*${item.price}+${item.price}`);
    this.productService.mathCalc(expr).subscribe(res => {
      if (!res['error']) {
        this.mapGstPriceWithActual(res['result']);
      }
    });
  }
  mapGstPriceWithActual(gstPrice) {
    this.products.forEach((item, index) => {
      this.products[index]['gstAdded'] = gstPrice[index];
    });
  }
  initChart() {
    const series = [{
      name: 'Product Count',
      colorByPoint: true, data: []
    }];
    Object.keys(this.chartData).forEach((key, index) => {
      const ch: Object = {};
      const persentageOfProduct = Math.floor((this.chartData[key].length / this.products.length) * 100);
      ch['name'] = `%age of product(s) count of GST ${key}% is ${persentageOfProduct}`;
      ch['y'] = this.chartData[key].length;
      series[0]['data'].push(ch);
    });
    const chart = new Chart({
      chart: {
        type: 'pie',
        backgroundColor: '#ececec',
      },
      title: {
        text: 'Product Chart'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }
      },
      credits: {
        enabled: false
      },
      series: series
    });
    this.chart = chart;
  }
  groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };
}

import {Pipe, PipeTransform} from '@angular/core';
import {Product} from '../models';
@Pipe({
  name: 'productSearch'
})
export class ProductSearchPipe implements PipeTransform {
  transform(products:Product[], searchString: string) : any {
    let matches: Product[] = [];

    if (!searchString) {
      return products;
    }
    products.forEach(function (product) {
      if (product.product_name.match(new RegExp(searchString, 'i'))) {
        matches.push(product);
      }
    });
    return matches;
  }
}
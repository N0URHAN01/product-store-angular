import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discountPrice'
})
export class DiscountPricePipe implements PipeTransform {
  transform(price: number, discountPercentage: number): number {
    const discountedPrice = price - (price * discountPercentage / 100);
    return +discountedPrice.toFixed(2);
  }
}

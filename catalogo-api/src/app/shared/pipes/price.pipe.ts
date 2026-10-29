import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform, inject } from '@angular/core';

@Pipe({
  name: 'price',
  standalone: true,
  pure: true,
})
export class PricePipe implements PipeTransform {
  private readonly currencyPipe = inject(CurrencyPipe);

  transform(value: number): string {
    return (
      this.currencyPipe.transform(value, 'EUR', 'symbol', '1.2-2', 'es-ES') ??
      `${value.toFixed(2)} €`
    );
  }
}
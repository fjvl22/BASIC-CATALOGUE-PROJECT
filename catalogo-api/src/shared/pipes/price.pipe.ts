import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
  standalone: true,
  pure: true,
})
export class PricePipe implements PipeTransform {
  private readonly formatter = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  });

  transform(value: number): string {
    return this.formatter.format(value);
  }
}
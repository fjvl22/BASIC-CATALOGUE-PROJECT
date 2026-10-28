
import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  catchError,
  finalize,
  map,
  of,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs';

import { Product } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { PricePipe } from '../../shared/pipes/price.pipe';

@Component({
  selector: 'app-product-detail',
  imports: [AsyncPipe, RouterLink, PricePipe],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);

  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  readonly product$ = this.route.paramMap.pipe(
    map((params) => Number(params.get('id'))),
    switchMap((id) => {
      this.loading.set(true);
      this.error.set(null);

      if (!Number.isInteger(id) || id <= 0) {
        this.error.set('El identificador del producto no es válido.');
        this.loading.set(false);
        return of(null);
      }

      return this.productService.getProductById(id).pipe(
        map((product) => product as Product | null),
        catchError((error: unknown) => {
          console.error('Error cargando el producto:', error);
          this.error.set('No se ha podido encontrar este producto.');
          return of(null);
        }),
        startWith(null),
        finalize(() => this.loading.set(false)),
      );
    }),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  addToCart(product: Product): void {
    this.cartService.add(product);
  }
}

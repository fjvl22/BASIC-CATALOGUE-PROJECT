import { AsyncPipe, NgIf } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { catchError, map, of, shareReplay, startWith, switchMap } from "rxjs";

import { Product } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { PricePipe } from '../../shared/pipes/price.pipe';

type ProductDetailState = | { status: 'loading' } | { status: 'success'; product: Product } | { status: 'error'; message: string } | { status: 'not-found' };

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [AsyncPipe, RouterLink, PricePipe],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);

  readonly state$ = this.route.paramMap.pipe(
    map((params) => Number(params.get('id'))),
    switchMap((id): ReturnType<typeof<ProductDetailState>> | ReturnType<typeof this.productService.getProductById> => {
      if (!Number.isInteger(id) || id <= 0) {
        return of({ status: 'not-found' } as ProductDetailState);
      }

      return this.productService.getProductById(id).pipe(
        map((product): ProductDetailState => product ? { status: 'success', product } : { status: 'not-found' },),
        catchError((error: HttpErrorResponse) => {
          console.error('Error cargando el producto: ', error);

          return of({
            status: 'error',
            message: 'No se ha podido cargar el producto.',
          } as ProductDetailState);
        }),
        startWith({ status: 'loading' } as ProductDetailState),
      );
    }),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  addToCart(product: Product): void { this.cartService.addToCart(product); }
}
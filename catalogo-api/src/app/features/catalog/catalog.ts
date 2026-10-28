import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { catchError, finalize, of, startWith, Subject, switchMap } from 'rxjs';

import { ProductService } from '../../core/services/product.service';
import { ProductCard } from '../../shared/components/product-card/product-card';

@Component({
  selector: 'app-catalog',
  imports: [AsyncPipe, ProductCard],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Catalog {
  private readonly productService = inject(ProductService);
  private readonly reload$ = new Subject<void>();

  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  readonly products$ = this.reload$.pipe(
    // Cada emisión inicia una nueva carga del catálogo.
    startWith(void 0),
    switchMap(() => {
      this.loading.set(true);
      this.error.set(null);

      return this.productService.getProducts().pipe(
        catchError((error: unknown) => {
          console.error('Error cargando productos:', error);
          this.error.set(
            'No se ha podido cargar el catálogo. Comprueba tu conexión e inténtalo de nuevo.',
          );

          return of([]);
        }),
        finalize(() => this.loading.set(false)),
      );
    }),
  );

  constructor() {
    this.reload$.next();
  }

  retry(): void {
    this.reload$.next();
  }
}

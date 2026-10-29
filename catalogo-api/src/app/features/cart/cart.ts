import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CartService } from '../../core/services/cart.service';
import { PricePipe } from '../../shared/pipes/price.pipe';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, PricePipe],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cart { readonly cart = inject(CartService); }
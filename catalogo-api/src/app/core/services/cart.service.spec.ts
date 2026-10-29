
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { CartService } from './cart.service';
import { Product } from '../models/product.model';

const productA: Product = {
  id: 1,
  title: 'Producto A',
  price: 10,
  description: 'Descripción A',
  category: 'test',
  image: 'https://example.com/a.png',
};

const productB: Product = {
  id: 2,
  title: 'Producto B',
  price: 15,
  description: 'Descripción B',
  category: 'test',
  image: 'https://example.com/b.png',
};

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartService],
    });

    service = TestBed.inject(CartService);
  });

  it('starts with an empty cart', () => {
    expect(service.items()).toEqual([]);
    expect(service.totalItems()).toBe(0);
    expect(service.totalPrice()).toBe(0);
  });

  it('adds a product to the cart', () => {
    service.add(productA);

    expect(service.items()).toHaveLength(1);
    expect(service.items()[0].product.id).toBe(1);
    expect(service.items()[0].quantity).toBe(1);
  });

  it('increases quantity when the same product is added twice', () => {
    service.add(productA);
    service.add(productA);

    expect(service.items()).toHaveLength(1);
    expect(service.items()[0].quantity).toBe(2);
    expect(service.totalItems()).toBe(2);
    expect(service.totalPrice()).toBe(20);
  });

  it('calculates totals for different products', () => {
    service.add(productA);
    service.add(productB);

    expect(service.totalItems()).toBe(2);
    expect(service.totalPrice()).toBe(25);
  });

  it('decreases quantity and removes products at zero', () => {
    service.add(productA);
    service.add(productA);

    service.decrease(1);
    expect(service.items()[0].quantity).toBe(1);

    service.decrease(1);
    expect(service.items()).toEqual([]);
    expect(service.totalItems()).toBe(0);
  });

  it('removes a product explicitly', () => {
    service.add(productA);
    service.add(productB);

    service.remove(1);

    expect(service.items()).toHaveLength(1);
    expect(service.items()[0].product.id).toBe(2);
    expect(service.totalPrice()).toBe(15);
  });

  it('clears the cart', () => {
    service.add(productA);
    service.add(productB);

    service.clear();

    expect(service.items()).toEqual([]);
    expect(service.totalItems()).toBe(0);
    expect(service.totalPrice()).toBe(0);
  });
});

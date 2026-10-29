
import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { ProductService } from './product.service';
import { Product } from '../models/product.model';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  const apiUrl = 'https://fakestoreapi.com/products';

  const product: Product = {
    id: 1,
    title: 'Producto de prueba',
    price: 20,
    description: 'Descripción',
    category: 'test',
    image: 'https://example.com/product.png',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('requests all products with GET', () => {
    service.getProducts().subscribe((products) => {
      expect(products).toEqual([product]);
    });

    const request = httpMock.expectOne(apiUrl);

    expect(request.request.method).toBe('GET');

    request.flush([product]);
  });

  it('requests one product by ID', () => {
    service.getProductById(1).subscribe((result) => {
      expect(result).toEqual(product);
    });

    const request = httpMock.expectOne(`${apiUrl}/1`);

    expect(request.request.method).toBe('GET');

    request.flush(product);
  });

  it('creates a product with POST', () => {
    const newProduct = {
      title: 'Nuevo producto',
      price: 25,
      description: 'Nuevo producto de prueba',
      category: 'test',
      image: 'https://example.com/new.png',
    };

    service.createProduct(newProduct).subscribe((result) => {
      expect(result.id).toBe(3);
      expect(result.title).toBe(newProduct.title);
    });

    const request = httpMock.expectOne(apiUrl);

    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(newProduct);

    request.flush({ id: 3, ...newProduct });
  });
});

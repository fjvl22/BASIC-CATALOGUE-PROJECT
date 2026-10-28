
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ProductCreate } from './product-create';
import { ProductService } from '../../../core/services/product.service';

describe('ProductCreate', () => {
  let fixture: ComponentFixture<ProductCreate>;
  let component: ProductCreate;
  let productServiceMock: {
    createProduct: ReturnType<typeof vi.fn>;
  };
  let router: Router;
  let navigateSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(async () => {
    productServiceMock = {
      createProduct: vi.fn().mockReturnValue(
        of({
          id: 101,
          title: 'Producto de prueba',
          price: 25,
          description: 'Descripción de prueba',
          category: 'test',
          image: 'https://example.com/product.png',
        }),
      ),
    };

    await TestBed.configureTestingModule({
      imports: [ProductCreate],
      providers: [
        provideRouter([]),
        {
          provide: ProductService,
          useValue: productServiceMock,
        },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    navigateSpy = vi.spyOn(router, 'navigate');

    fixture = TestBed.createComponent(ProductCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates the component successfully', () => {
    expect(component).toBeTruthy();
  });

  it('does not submit an empty form', () => {
    const form = fixture.nativeElement.querySelector('form')
      as HTMLFormElement;

    form.dispatchEvent(
      new Event('submit', { bubbles: true, cancelable: true }),
    );

    fixture.detectChanges();

    expect(productServiceMock.createProduct).not.toHaveBeenCalled();
  });

  it('marks required fields as invalid when they are empty', () => {
    // Ajusta estos nombres si tus formControlName son diferentes.
    const titleInput = fixture.nativeElement.querySelector(
      '[formControlName="title"]',
    ) as HTMLInputElement;

    expect(titleInput).toBeTruthy();

    titleInput.value = '';
    titleInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(
      titleInput.classList.contains('ng-invalid'),
    ).toBe(true);
  });

  it('submits valid product data and navigates to admin', () => {
    const values: Record<string, string> = {
      title: 'Producto de prueba',
      price: '25',
      description: 'Descripción de prueba',
      category: 'test',
      image: 'https://example.com/product.png',
    };

    for (const [name, value] of Object.entries(values)) {
      const input = fixture.nativeElement.querySelector(
        `[formControlName="${name}"]`,
      ) as HTMLInputElement | HTMLTextAreaElement | null;

      if (!input) {
        throw new Error(
          `No se encontró el control del formulario: ${name}`,
        );
      }

      input.value = value;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('blur'));
    }

    fixture.detectChanges();

    const form = fixture.nativeElement.querySelector('form')
      as HTMLFormElement;

    form.dispatchEvent(
      new Event('submit', { bubbles: true, cancelable: true }),
    );

    fixture.detectChanges();

    expect(productServiceMock.createProduct).toHaveBeenCalledWith({
      title: 'Producto de prueba',
      price: 25,
      description: 'Descripción de prueba',
      category: 'test',
      image: 'https://example.com/product.png',
    });

    expect(navigateSpy).toHaveBeenCalled();
  });
});

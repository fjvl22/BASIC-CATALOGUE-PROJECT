import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { NewProduct } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product.service';

const notBlank: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const value = control.value;

  return typeof value === 'string' && value.trim().length === 0
    ? { blank: true }
    : null;
};

@Component({
  selector: 'app-product-create',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './product-create.html',
  styleUrl: './product-create.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCreate {
  private readonly productService = inject(ProductService);
  private readonly router = inject(Router);

  readonly submitting = signal(false);
  readonly error = signal<string | null>(null);

  readonly categories = [
    { value: "men's clothing", label: 'Ropa de hombre' },
    { value: "women's clothing", label: 'Ropa de mujer' },
    { value: 'jewelery', label: 'Joyería' },
    { value: 'electronics', label: 'Electrónica' },
  ];

  readonly form = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, notBlank, Validators.maxLength(120)],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, notBlank, Validators.maxLength(2000)],
    }),
    price: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(0.01)],
    }),
    category: new FormControl("men's clothing", {
      nonNullable: true,
      validators: [Validators.required],
    }),
    image: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(/^https?:\/\/\S+$/i),
      ],
    }),
  });

  submit(): void {
    if (this.form.invalid || this.submitting()) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    if (value.price === null) {
      return;
    }

    const product: NewProduct = {
      title: value.title.trim(),
      description: value.description.trim(),
      price: value.price,
      category: value.category,
      image: value.image.trim(),
    };

    this.submitting.set(true);
    this.error.set(null);

    this.productService.createProduct(product).subscribe({
      next: () => {
        void this.router.navigate(['/admin'], {
          queryParams: { created: 'true' },
        });
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error creando el producto:', error);
        this.error.set(
          'No se ha podido crear el producto. Revisa la conexión e inténtalo de nuevo.',
        );
        this.submitting.set(false);
      },
    });
  }
}
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormsModule, ReactiveFormsModule,  FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../Services/product.service';
import { Product } from '../../../Model/class';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit, OnDestroy {
  editId: number | null = null;
  imagePreviewUrl: string | null = null;
  private readonly fb = inject(FormBuilder);

  productForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    image: [null as File | null, Validators.required]
  });

  constructor(
    private readonly productService: ProductService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editId = +id;
      this.productService.getProductById(this.editId).subscribe((product: Product) => {
        this.productForm.patchValue({
          name: product.name ?? '',
          description: product.description,
          price: product.price,
          stock: product.stock
        });
      });
    }
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    this.productForm.patchValue({
      image: file
    });

    this.productForm.get('image')?.updateValueAndValidity();

    // Create a temporary browser URL for preview.
    this.imagePreviewUrl = URL.createObjectURL(file);
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();

    formData.append('name', this.productForm.value.name ?? '');
    formData.append('description', this.productForm.value.description ?? '');
    formData.append('price', String(this.productForm.value.price ?? 0));
    formData.append('stock', String(this.productForm.value.stock ?? 0));

    const image = this.productForm.value.image;

    if (image) {
      formData.append('image', image);
    }

    if (this.editId) {
      this.productService.updateProduct(this.editId, formData).subscribe(() => {
        this.router.navigate(['/products']);
      });
    } else {
      this.productService.createProduct(formData).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }

  ngOnDestroy(): void {
    if (this.imagePreviewUrl) {
      URL.revokeObjectURL(this.imagePreviewUrl);
    }
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }
}

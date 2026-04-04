import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../Services/product.service';
import { Product, ProductRequest } from '../../../Model/class';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
  editId: number | null = null;

  productForm: ProductRequest = {
    name: '',
    description: '',
    price: 0,
    stock: 0,
    imageUrl: ''
  };

  constructor(
    private readonly productService: ProductService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editId = +id;
      this.productService.getProductById(this.editId).subscribe((product: Product) => {
        this.productForm = {
          name: product.name ?? '',
          description: product.description,
          price: product.price,
          stock: product.stock,
          imageUrl: product.imageUrl ?? ''
        };
      });
    }
  }

  save(): void {
    if (this.editId) {
      this.productService.updateProduct(this.editId, this.productForm).subscribe(() => {
        this.router.navigate(['/products']);
      });
    } else {
      this.productService.createProduct(this.productForm).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }
}

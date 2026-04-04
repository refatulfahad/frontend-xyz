import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ProductCardComponent } from './product-card/product-card.component';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { selectProduct, selectTotalProduct, selectProductLoading } from '../../State/product.selectors';
import { Product } from '../../Model/class';
import { loadProduct } from '../../State/product.action';
import { ProductService } from '../../Services/product.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MatPaginatorModule, ProductCardComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit, OnDestroy {
  totalProducts$: Observable<number>;
  loading$: Observable<boolean>;
  products: Product[] = [];
  pageSize: number = 10;
  pageIndex: number = 0;
  searchQuery: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly router: Router,
    private readonly store: Store,
    private readonly productService: ProductService
  ) {
    this.totalProducts$ = this.store.select(selectTotalProduct);
    this.loading$ = this.store.select(selectProductLoading);
  }

  ngOnInit(): void {
    this.store.select(selectProduct)
      .pipe(takeUntil(this.destroy$))
      .subscribe(products => (this.products = products));

    this.dispatchLoad();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.dispatchLoad();
  }

  onSearch(): void {
    const name = this.searchQuery.trim();
    if (!name && this.minPrice == null && this.maxPrice == null) {
      this.dispatchLoad();
      return;
    }
    this.productService.searchProducts(
      name,
      this.pageIndex + 1,
      this.pageSize,
      this.minPrice ?? undefined,
      this.maxPrice ?? undefined
    ).pipe(takeUntil(this.destroy$))
      .subscribe(response => (this.products = response));
  }

  viewProductDetails(id: number): void {
    this.router.navigate(['/product-details', id]);
  }

  dispatchLoad(): void {
    this.store.dispatch(loadProduct({ pageSize: this.pageSize, pageIndex: this.pageIndex }));
  }
}


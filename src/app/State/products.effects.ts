import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { ProductService } from '../Services/product.service';
import { loadProduct, loadProductFailure, loadProductSuccess } from './product.action';

@Injectable()
export class ProductsEffects {
    private readonly actions$ = inject(Actions);
    private readonly productService = inject(ProductService);

    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadProduct),
            exhaustMap(({ pageSize, pageIndex }) =>
                this.productService.getProducts(pageIndex - 1, pageSize).pipe(
                    map(response => loadProductSuccess({ products: response.products, totalItems: response.total })),
                    catchError(() => of(loadProductFailure({ errorMessage: 'Failed to load products' })))
                )
            )
        )
    );
} 
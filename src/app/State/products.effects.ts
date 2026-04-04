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
                this.productService.getProducts(pageIndex, pageSize).pipe(
                    map(response => loadProductSuccess({ products: response, totalItems: response.length })),
                    catchError(() => of(loadProductFailure({ errorMessage: 'Failed to load products' })))
                )
            )
        )
    );
} 
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductState } from "./product.reducer";

export const productStore = createFeatureSelector<ProductState>('product');

export const selectProduct = createSelector(
    productStore,
    (state: ProductState) => state.products
);

export const selectProductError = createSelector(
    productStore,
    (state: ProductState) => state.error
);

export const selectTotalProduct = createSelector(
    productStore,
    (state: ProductState) => state.totalItems
);

export const selectProductLoading = createSelector(
    productStore,
    (state: ProductState) => state.loading
);
import { Product } from "../Model/class";
import { loadProduct, loadProductFailure, loadProductSuccess } from "./product.action";
import { createReducer, on } from "@ngrx/store";

export interface ProductState {
    products: Product[],
    totalItems: number,
    loading: boolean,
    error: string | null
}
export const initialState: ProductState = {
    products: [],
    totalItems: 0,
    loading: false,
    error: ''
};

export const productReducer = createReducer(
    initialState,
    on(loadProduct, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(loadProductSuccess, (state, { products, totalItems }) => ({
        ...state,
        products,
        totalItems,
        loading: false,
        error: null
    })),
    on(loadProductFailure, (state, { errorMessage }) => ({
        ...state,
        loading: false,
        error: errorMessage
    }))
);
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductRequest, ProductsResponse } from '../Model/class';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    private readonly http = inject(HttpClient);

    getProducts(pageIndex: number, pageSize: number): Observable<Product[]> {
        const params = new HttpParams()
            .set('skip', pageIndex * pageSize)
            .set('limit', pageSize);
        return this.http.get<Product[]>('/api/Product/pagination', { params });
    }

    getProductById(id: number): Observable<Product> {
        return this.http.get<Product>(`/api/Product/${id}`);
    }

    searchProducts(name: string, pageNumber: number, pageSize: number, minPrice?: number, maxPrice?: number): Observable<Product[]> {
        let params = new HttpParams()
            .set('name', name)
            .set('pageNumber', pageNumber)
            .set('pageSize', pageSize);
        if (minPrice != null) params = params.set('minPrice', minPrice);
        if (maxPrice != null) params = params.set('maxPrice', maxPrice);
        return this.http.get<Product[]>('/api/Product/search', { params });
    }

    createProduct(body: ProductRequest): Observable<Product> {
        return this.http.post<Product>('/api/Product', body);
    }

    updateProduct(id: number, body: ProductRequest): Observable<Product> {
        return this.http.put<Product>(`/api/Product/${id}`, body);
    }

    deleteProduct(id: number): Observable<void> {
        return this.http.delete<void>(`/api/Product/${id}`);
    }
}
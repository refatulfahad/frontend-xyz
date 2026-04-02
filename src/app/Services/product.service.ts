import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ProductsResponse } from '../Model/class';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    private readonly http = inject(HttpClient);

    getProducts(pageIndex: number, pageSize: number): Observable<ProductsResponse> {
        const params = new HttpParams()
            .set('limit', pageSize)
            .set('skip', pageIndex * pageSize);
        return this.http.get<ProductsResponse>('/products', { params });
    }
}
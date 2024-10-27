import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProductService {

    constructor(private http: HttpClient) { }

    getProducts(pageIndex: number, pageSize: number) {
        const skip = pageIndex * pageSize;
        const resourceUrl: string = `https://dummyjson.com/products?limit=${pageSize}&skip=${skip}&select=brand,title,category,description,price,images,stock`;
        return this.http.get(resourceUrl);
    }

    fetchImageWithDebug(): Observable<any> {
        return this.http.get('/rid-files/227ea1b6-e13a-4292-bb43-96e3b64b16bb', { responseType: 'arraybuffer' }).
        pipe(
            map(response =>{
                const blob = new Blob([response], { type: 'image/jpeg' });
                debugger
                return URL.createObjectURL(blob);
            })
        );
    }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ProductService {

    constructor(private http: HttpClient) { }

    getProducts(pageIndex: number, pageSize: number) {
        const skip = pageIndex * pageSize;
        const resourceUrl: string = `${environment.baseAPI}Product`;
        return this.http.get(resourceUrl);
    }

    fetchImageWithDebug(): Observable<any> {
        return this.http.get('/rid-files/227ea1b6-e13a-4292-bb43-96e3b64b16bb', { responseType: 'arraybuffer' }).
        pipe(
            map(response =>{
                const blob = new Blob([response], { type: 'image/jpeg' });
                return URL.createObjectURL(blob);
            })
        );
    }
}
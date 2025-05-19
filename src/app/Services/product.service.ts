import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ProductService {

    constructor(private http: HttpClient) { }

    getProducts(pageIndex: number, pageSize: number) {
        const skip = pageIndex * pageSize;
        const resourceUrl: string = `${environment.baseAPI}api/Product`;
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

    authenticateWithKeycloak() {
        const queryStr = 'scope=openid&response_type=code&client_id=public-client&redirect_uri=http://localhost:3001/auth_redirect'
        const apiUrl = `http://localhost:8080/realms/UserAccessRealm/protocol/openid-connect/auth?${queryStr}`;
        window.location.href = apiUrl;
    }

    exchangeCodeForToken(code: string): Observable<any> {
        const body = new HttpParams()
            .set('grant_type', 'authorization_code')
            .set('client_id', 'public-client')
            .set('code', code)
            .set('redirect_uri', 'http://localhost:3001/auth_redirect');
       
        return this.http.post('/realms/UserAccessRealm/protocol/openid-connect/token', body)
    }
}
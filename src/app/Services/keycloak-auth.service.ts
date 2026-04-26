import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TokenResponse } from '../Model/class';

@Injectable({
    providedIn: 'root',
})
export class KeycloakAuthService {
    private readonly http = inject(HttpClient);

    authenticateWithKeycloak(): void {
        const { keycloakBaseUrl, keycloakRealm, keycloakClientId, keycloakRedirectUri } = environment;
        const queryStr = new HttpParams()
            .set('scope', 'openid')
            .set('response_type', 'code')
            .set('client_id', keycloakClientId)
            .set('redirect_uri', keycloakRedirectUri)
            .toString();
        window.location.href = `${keycloakBaseUrl}/realms/${keycloakRealm}/protocol/openid-connect/auth?${queryStr}`;
    }

    exchangeCodeForToken(code: string): Observable<TokenResponse> {
        const { keycloakProxyPrefix, keycloakRealm, keycloakClientId, keycloakRedirectUri } = environment;
        const body = new HttpParams()
            .set('grant_type', 'authorization_code')
            .set('client_id', keycloakClientId)
            .set('code', code)
            .set('redirect_uri', keycloakRedirectUri);

        return this.http.post<TokenResponse>(
            `${keycloakProxyPrefix}/${keycloakRealm}/protocol/openid-connect/token`,
            body
        );
    }
}

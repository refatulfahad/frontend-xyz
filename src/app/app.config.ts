import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { cartReducer } from './State/carts.reducer';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { BeforeAppInit } from '@ngrx-addons/common';
import { providePersistStore } from '@ngrx-addons/persist-state';
import localForage from 'localforage';
import { provideEffects } from '@ngrx/effects';
import { ProductsEffects } from './State/products.effects';
import { productReducer } from './State/product.reducer';
import { jwtInterceptor } from './Core/Interceptors/jwt.interceptor';

const reducers = {
  cart: cartReducer,
} as const;

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch(), withInterceptors([jwtInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideAnimations(),
    provideToastr(
      {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
        closeButton: true,
        progressBar: true,
      }
    ),
    provideStore(),
    provideState({ name: 'cart', reducer: cartReducer }),
    provideState({ name: 'product', reducer: productReducer }),
    provideStoreDevtools({
      maxAge: 25
    }),
    providePersistStore<typeof reducers>({
      states: [
        {
          key: 'cart',
          storage: localForage
        },
      ],
      storageKeyPrefix: 'mixpanel-frontend',
      strategy: BeforeAppInit,
    }),
    provideEffects(ProductsEffects),
  ]
};

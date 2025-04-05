import {APP_INITIALIZER, ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {HttpClient, HttpClientModule, provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {provideStore, Store} from '@ngrx/store';
import {provideStoreFeatures} from './store/store.providers';
import {authInterceptor} from './core/interceptors/auth.interceptor';
import * as AuthActions from './store/auth/auth.actions';
import {loadingInterceptor} from './core/interceptors/loading.interceptor';

export function httpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
export function initAuthFactory(store: Store) {
  return () => store.dispatch(AuthActions.initAuth());
}
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection(
    {eventCoalescing: true}),
    provideHttpClient(withFetch()),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideStore(),
    provideStoreFeatures,
    {
      provide: APP_INITIALIZER,
      useFactory: initAuthFactory,
      deps: [Store],
      multi: true
    },
    provideHttpClient(withInterceptors([loadingInterceptor])),
    importProvidersFrom(
      HttpClientModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient]
        },
        defaultLanguage: 'vi'
      })
    )
  ]
};

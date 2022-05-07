import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AntDesignComponentsModule } from './modules/ant-design-components.module';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DashboardService } from './services/dashboard.service';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommonInterceptor } from './shared/interceptors/common.interceptor';
import { ProfilService } from './services/profil.service';
import { AuthentificationService } from './services/auth/authentification.service';
import { WarehouseLocalStorage } from './utils/warehouse-local-storage';
import { AuthorizationService } from './services/auth/authorization.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    { prefix: '../assets/i18n/', suffix: ".json" },
  ]);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AntDesignComponentsModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    AuthentificationService,
    AuthorizationService,
    WarehouseLocalStorage,
    DashboardService,
    ProfilService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CommonInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

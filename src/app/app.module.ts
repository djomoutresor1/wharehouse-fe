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
import { FlagService } from './services/flag.service';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { ViewService } from './services/view-file.service';
import { WarehouseBaseComponent } from './base/warehouse-base/warehouse-base.component';
import { ViewProfilService } from './services/view-profil.service';
import { ConfigurationService } from './services/configuration.service';


export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    { prefix: '../assets/i18n/', suffix: ".json" },
  ]);
}

@NgModule({
  declarations: [AppComponent, WarehouseBaseComponent],
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
    FlagService,
    ViewProfilService,
    ConfigurationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CommonInterceptor,
      multi: true,
    },
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

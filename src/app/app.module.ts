import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AntDesignComponentsModule } from './modules/ant-design-components.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DashboardService } from './services/dashboard.service';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommonInterceptor } from './shared/interceptors/common.interceptor';
import { ProfilService } from './services/profil.service';
import { AuthentificationService } from './services/auth/authentification.service';
import { WarehouseLocalStorage } from './utils/warehouse-local-storage';
import { AuthorizationService } from './services/auth/authorization.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AntDesignComponentsModule,
    SharedModule,
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

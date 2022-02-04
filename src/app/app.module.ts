import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AntDesignComponentsModule } from './modules/ant-design-components.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DashboardService } from './services/dashboard.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AntDesignComponentsModule,
    SharedModule,
  ],
  providers: [DashboardService],
  bootstrap: [AppComponent],
})
export class AppModule {}

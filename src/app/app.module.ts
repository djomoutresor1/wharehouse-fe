import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CorsiaPComponent } from './corsia/corsia-p/corsia-p.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { FooterComponent } from './footer/footer/footer.component';
import { HeaderComponent } from './header/header/header.component';
import { CorsiaTableComponent } from './table/corsia-table/corsia-table.component';
import { SingleCorsiaComponent } from './corsia/single-corsia/single-corsia.component';


@NgModule({
  declarations: [
    AppComponent,
    CorsiaPComponent,
    DashboardComponent,
    FooterComponent,
    HeaderComponent,
    CorsiaTableComponent,
    SingleCorsiaComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

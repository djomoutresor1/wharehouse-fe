import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CorsiaPComponent } from './corsia/corsia-p/corsia-p.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { FooterComponent } from './footer/footer/footer.component';
import { HeaderComponent } from './header/header/header.component';
import { CorsiaTableComponent } from './table/corsia-table/corsia-table.component';
import { SingleCorsiaComponent } from './corsia/single-corsia/single-corsia.component';
import { RackTableComponent } from './table/rack-table/rack-table.component';
import { EditTableComponent } from './table/edit-table/edit-table.component';
import { DashboardService } from './services/dashboard.service';

@NgModule({
  declarations: [
    AppComponent,
    CorsiaPComponent,
    RackTableComponent,
    DashboardComponent,
    FooterComponent,
    HeaderComponent,
    CorsiaTableComponent,
    SingleCorsiaComponent,
    EditTableComponent,
  ],
  imports: [HttpClientModule, BrowserModule, AppRoutingModule],
  providers: [DashboardService],
  bootstrap: [AppComponent],
})
export class AppModule {}

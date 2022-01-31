import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AntDesignComponentsModule } from './modules/ant-design-components.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { FooterComponent } from './footer/footer/footer.component';
import { HeaderComponent } from './header/header/header.component';
import { CorsiaTableComponent } from './table/corsia-table/corsia-table.component';
import { RackTableComponent } from './table/rack-table/rack-table.component';
import { EditTableComponent } from './table/edit-table/edit-table.component';
import { DashboardService } from './services/dashboard.service';
import { VerticalLaneComponent } from './composants/vertical-lane/vertical-lane.component';
import { HorizontalLaneComponent } from './composants/horizontal-lane/horizontal-lane.component';

@NgModule({
  declarations: [
    AppComponent,
    RackTableComponent,
    DashboardComponent,
    FooterComponent,
    HeaderComponent,
    CorsiaTableComponent,
    EditTableComponent,
    VerticalLaneComponent,
    HorizontalLaneComponent,
  ],
  imports: [HttpClientModule, BrowserModule, AppRoutingModule, AntDesignComponentsModule],
  providers: [DashboardService],
  bootstrap: [AppComponent],
})
export class AppModule {}

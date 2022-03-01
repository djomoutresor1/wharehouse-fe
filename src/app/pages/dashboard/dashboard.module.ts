import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AntDesignComponentsModule } from 'src/app/modules/ant-design-components.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DashboardRackDetailComponent } from './dashboard-rack-detail/dashboard-rack-detail.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';

@NgModule({
  declarations: [DashboardComponent, DashboardRackDetailComponent, DashboardHomeComponent],
  imports: [
    HttpClientModule,
    FormsModule,
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    AntDesignComponentsModule,
  ],
  exports: [],
})
export class DashboardModule {}

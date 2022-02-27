import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AntDesignComponentsModule } from 'src/app/modules/ant-design-components.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [SharedModule, DashboardRoutingModule, AntDesignComponentsModule],
  exports: [],
})
export class DashboardModule {}

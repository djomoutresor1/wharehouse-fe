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
import { ProfileComponent } from './tabs-content/profile/profile.component';
import { PreferencesComponent } from './tabs-content/preferences/preferences.component';
import { RackTableComponent } from 'src/app/table/rack-table/rack-table.component';

import { DashboardHeaderComponent } from './utils/dashboard-header/dashboard-header.component';
import { DashboardSiderComponent } from './utils/dashboard-sider/dashboard-sider.component';
import { DashboardRackGlobalComponent } from './dashboard-rack-global/dashboard-rack-global.component';
import { IconsComponent } from 'src/app/shared/composants/icons/icons.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardRackDetailComponent,
    DashboardHomeComponent,
    ProfileComponent,
    PreferencesComponent,
    RackTableComponent,
    DashboardHeaderComponent,
    DashboardSiderComponent,
    DashboardRackGlobalComponent,
    IconsComponent
  ],
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

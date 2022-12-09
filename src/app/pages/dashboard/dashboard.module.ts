import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AntDesignComponentsModule } from 'src/app/modules/ant-design-components.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardRackDetailComponent } from './dashboard-rack-detail/dashboard-rack-detail.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { ProfileComponent } from './tabs-content/profile/profile.component';
import { PreferencesComponent } from './tabs-content/preferences/preferences.component';
import { RackTableComponent } from 'src/app/table/rack-table/rack-table.component';
import { DashboardHeaderComponent } from './utils/dashboard-header/dashboard-header.component';
import { DashboardSiderComponent } from './utils/dashboard-sider/dashboard-sider.component';
import { DashboardRackGlobalComponent } from './dashboard-rack-global/dashboard-rack-global.component';
import { AllUsersComponent } from './tabs-content/all-users/all-users.component';
import { DashboardUserAddComponent } from './dashboard-user/dashboard-user-add/dashboard-user-add.component';
import { DashboardUserEditComponent } from './dashboard-user/dashboard-user-edit/dashboard-user-edit.component';
import { AdvancedFiltersUsersComponent } from './tabs-content/all-users/advanced-filters/advanced-filters.component';
import { DashboardFooterComponent } from './utils/dashboard-footer/dashboard-footer.component';
import { HeaderNotificationsComponent } from './utils/dashboard-header/components/header-notifications/header-notifications.component';
import { DashboardNotificationsComponent } from './utils/dashboard-notifications/dashboard-notifications.component';
import { DashboardOrganizationComponent } from './dashboard-organization/dashboard-organization.component';
import { HeaderHelpsComponent } from './utils/dashboard-header/components/header-helps/header-helps.component';
import { HelpComponent } from './dashboard-configuration/help/help.component';
import { GlossaryComponent } from './dashboard-configuration/glossary/glossary.component';
import { HeaderLinksComponent } from './utils/dashboard-header/components/header-links/header-links.component';
import { AdvancedFiltersOrganizationsComponent } from './dashboard-organization/advanced-filters/advanced-filters.component';
import { OrganizationShowComponent } from './dashboard-organization/organization-show/organization-show.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
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
    AllUsersComponent,
    DashboardUserAddComponent,
    DashboardUserEditComponent,
    AdvancedFiltersUsersComponent,
    AdvancedFiltersOrganizationsComponent,
    DashboardFooterComponent,
    HeaderHelpsComponent,
    HeaderNotificationsComponent,
    DashboardNotificationsComponent,
    HelpComponent,
    GlossaryComponent,
    HeaderLinksComponent,
    DashboardOrganizationComponent,
    OrganizationShowComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    SharedModule,
    AngularEditorModule,
    DashboardRoutingModule,
    AntDesignComponentsModule,
  ]
})
export class DashboardModule {}

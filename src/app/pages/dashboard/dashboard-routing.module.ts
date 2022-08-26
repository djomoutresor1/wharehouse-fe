import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { PathParams } from 'src/app/shared/enums/path-params-enums';
import { ChangePasswordComponent } from '../warehouse/auth/password/change-password/change-password.component';
import { ManagePasswordComponent } from '../warehouse/components/manage-password/manage-password.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardRackDetailComponent } from './dashboard-rack-detail/dashboard-rack-detail.component';
import { DashboardRackGlobalComponent } from './dashboard-rack-global/dashboard-rack-global.component';
import { DashboardUserAddComponent } from './dashboard-user/dashboard-user-add/dashboard-user-add.component';
import { DashboardUserEditComponent } from './dashboard-user/dashboard-user-edit/dashboard-user-edit.component';
import { DashboardComponent } from './dashboard.component';
import { AllUsersComponent } from './tabs-content/all-users/all-users.component';
import { PreferencesComponent } from './tabs-content/preferences/preferences.component';
import { ProfileComponent } from './tabs-content/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: DashboardHomeComponent,
      },
      {
        path: `${Pages.USER}/${Pages.CREATE}`,
        component: DashboardUserAddComponent,
      },
      {
        path: `${Pages.USER}/${Pages.EDIT}`,
        component: DashboardUserEditComponent,
      },
      {
        path: `${Pages.GLOBAL_RACK}/:${PathParams.RACK_NAME}`,
        component: DashboardRackGlobalComponent,
      },
      {
        path: `${Pages.GLOBAL_RACK}/:${PathParams.RACK_NAME}`,
        component: DashboardRackGlobalComponent,
      },
      {
        path: `${Pages.RACK_DETAIL}/:${PathParams.RACK_NAME}/:${PathParams.RACK_NUMBER}`,
        component: DashboardRackDetailComponent,
      },
      {
        path: `${Pages.PROFILE}`,
        component: ProfileComponent
      },
      {
        path: `${Pages.MANAGE_PASSWORD}`,
        component: ManagePasswordComponent,
      },
      { path: `${Pages.SETTINGS}`, component: PreferencesComponent },
      { path: `${Pages.USERS}`, component: AllUsersComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}

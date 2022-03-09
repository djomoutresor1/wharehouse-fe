import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { PathParams } from 'src/app/shared/enums/path-params-enums';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardRackDetailComponent } from './dashboard-rack-detail/dashboard-rack-detail.component';
import { DashboardComponent } from './dashboard.component';
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
        path: `${Pages.RACK_DETAIL}/:${PathParams.RACK_NAME}/:${PathParams.RACK_NUMBER}`,
        component: DashboardRackDetailComponent,
      },
      { path: `${Pages.PROFILE}`, component: ProfileComponent },
      { path: `${Pages.SETTINGS}`, component: PreferencesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}

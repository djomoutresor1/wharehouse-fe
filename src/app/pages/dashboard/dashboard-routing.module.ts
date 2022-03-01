import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardRackDetailComponent } from './dashboard-rack-detail/dashboard-rack-detail.component';
import { DashboardComponent } from './dashboard.component';

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
        path: `${Pages.RACK_DETAIL}/:${Pages.RACK_NAME}`,
        component: DashboardRackDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}

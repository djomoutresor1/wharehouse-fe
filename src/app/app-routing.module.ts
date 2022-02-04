import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/composants/error-page/error-page.component';
import { Pages } from './shared/enums/pages-enums';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/warehouse/warehouse.module').then(
        ({ WarehouseModule }) => WarehouseModule
      ),
  },
  {
    path: `${Pages.DASHBOARD}`,
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        ({ DashboardModule }) => DashboardModule
      ),
  },
  { path: '**', component: ErrorPageComponent, pathMatch: 'full' },
]; // sets up routes constant where you define your routes

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

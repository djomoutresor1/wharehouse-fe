import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { WarehouseComponent } from './warehouse.component';

const routes: Routes = [
  { path: '', component: WarehouseComponent },
  { path: `${Pages.WAREHOUSE}`, component: WarehouseComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WarehouseRoutingModule {}

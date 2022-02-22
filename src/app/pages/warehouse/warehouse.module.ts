import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { WarehouseRoutingModule } from './warehouse-routing.module';
import { WarehouseComponent } from './warehouse.component';

@NgModule({
  declarations: [WarehouseComponent],
  imports: [SharedModule, WarehouseRoutingModule],
  exports: [],
})
export class WarehouseModule {}

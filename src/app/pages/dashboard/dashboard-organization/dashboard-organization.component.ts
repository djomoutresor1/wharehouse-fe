import { Component, OnInit, Injector } from '@angular/core';
import { WarehouseBaseComponent } from 'src/app/base/warehouse-base/warehouse-base.component';

@Component({
  selector: 'warehouse-dashboard-organization',
  templateUrl: './dashboard-organization.component.html',
  styleUrls: ['./dashboard-organization.component.scss'],
})
export class DashboardOrganizationComponent
  extends WarehouseBaseComponent
  implements OnInit
{
  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit(): void {}
}

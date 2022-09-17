import { Component, OnInit, Injector } from '@angular/core';
import { WarehouseBaseComponent } from 'src/app/base/warehouse-base/warehouse-base.component';

@Component({
  selector: 'warehouse-dashboard-notifications',
  templateUrl: './dashboard-notifications.component.html',
  styleUrls: ['./dashboard-notifications.component.scss']
})
export class DashboardNotificationsComponent extends WarehouseBaseComponent implements OnInit {

  constructor(injector: Injector) { 
    super(injector);
   }

  override ngOnInit(): void {
  }

}

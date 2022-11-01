import { Component, OnInit, Injector, Input, Output, EventEmitter } from '@angular/core';
import { WarehouseBaseComponent } from 'src/app/base/warehouse-base/warehouse-base.component';
import { Pages } from 'src/app/shared/enums/pages-enums';

@Component({
  selector: 'warehouse-header-notifications',
  templateUrl: './header-notifications.component.html',
  styleUrls: ['./header-notifications.component.scss']
})
export class HeaderNotificationsComponent extends WarehouseBaseComponent implements OnInit {

  @Input() showNotifications: boolean = false;
  @Output() OnNotifyNotifications: EventEmitter<any> = new EventEmitter<any>();
  
  constructor(injector: Injector) { 
    super(injector);
  }

  override ngOnInit(): void {
  }

  handleOnGoToNotifications() {
    this.showNotifications = false;
    this.OnNotifyNotifications.emit(false);
    this.handleOnNavigateByUrl(`${Pages.NOTIFICATIONS}`);
  }

  handleOnNotificationsReadAll() {
    console.log("handleOnNotificationsReadAll")
  }
}
